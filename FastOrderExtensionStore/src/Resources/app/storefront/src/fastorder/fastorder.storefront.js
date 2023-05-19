import HttpClient from 'src/service/http-client.service'
import Plugin from 'src/plugin-system/plugin.class'

export default class FastorderStorefront extends Plugin {
  init () {
    console.log('Fastorder init')

    // initialize the HttpClient
    this._client = new HttpClient()
    this._api_suggest = '/fast-order/suggest/'
    this.node = this.el.children['fast-order']

    this._registerEventProducts()
    this._registerEventQuantity()
    this._setAutocompleteHide()
  }

  _registerEventProducts () {
    this._selected = null
    const inputs = this.node.querySelectorAll('[data-id^="products_"]')
    const events = 'input'.split(' ')
    for (let i = 0; i < inputs.length; i++) {
      // loop all inputs from form
      for (let ev = 0, eventsCount = events.length; ev < eventsCount; ev++) {
        // register multiple events for each input
        inputs[i].addEventListener(events[ev], (event) => {
          const querySearch = event.target.value.trim()
          inputs[i].setAttribute('data-q', '')
          this._calculateShoppingBasket()

          if (querySearch.length >= 3) {
            this._selected = inputs[i]
            this._client.get(
              this._api_suggest + encodeURIComponent(querySearch),
              this._setContent.bind(this),
              'application/json',
              true
            )
          }
        })
      }
    }
  }

  _registerEventProductSelect () {
    const links = this.node.querySelectorAll('.fast-order-link')
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (event) => {
        const dataId = event.target.closest('a').getAttribute('data-id')
        const dataPrice = event.target.closest('a').getAttribute('data-price')
        const placeholder = event.target.closest('.fastorder-autocomplete')
        const input = placeholder.previousElementSibling
        if (input.classList.contains('fast-order-input')) {
          input.value = dataId
          input.setAttribute('data-q', dataPrice)
          this._calculateShoppingBasket()
        }
        this._setAutocompleteHide()
      })
    }
  }

  _registerEventQuantity () {
    const inputs = this.node.querySelectorAll('[data-id^="quantity_"]')
    const events = 'input'.split(' ')
    for (let i = 0; i < inputs.length; i++) {
      // loop all inputs from form
      for (let ev = 0, eventsCount = events.length; ev < eventsCount; ev++) {
        // register multiple events for each input
        inputs[i].addEventListener(events[ev], (event) => {
          inputs[i].setAttribute('data-q', event.target.value)
          this._calculateShoppingBasket()
        })
      }
    }
  }

  _setContent (content) {
    const input = this._selected
    const placeholder = input.nextElementSibling

    if (placeholder.classList.contains('fastorder-autocomplete')) {
      placeholder.innerHTML = content
      placeholder.style.display = 'block'
    }
    this._registerEventProductSelect()
  }

  _setAutocompleteHide () {
    document.body.addEventListener('click', (event) => {
      [].forEach.call(
        document.querySelectorAll('.fastorder-autocomplete'),
        function (el) {
          el.style.display = 'none'
        }
      )
    })
  }

  _calculateShoppingBasket () {
    let total = 0
    const row = this.node.querySelectorAll('[data-type="fast-order-row"]')

    for (let i = 0; i < row.length; i++) {
      let price = row[i].querySelector('[data-id^="products_"]')
      if (price != null) {
        price = parseFloat(price.getAttribute('data-q'))
      }

      let quantity = row[i].querySelector('[data-id^="quantity_"]')
      if (quantity != null) {
        quantity = parseInt(quantity.getAttribute('data-q'))
      }

      if (quantity > 0 && price > 0) {
        total += quantity * price
      }
    }

    this.node.querySelector('#fast-order-total-amount').innerHTML =
      total.toFixed(2)
  }
}
