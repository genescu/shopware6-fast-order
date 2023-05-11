import HttpClient from 'src/service/http-client.service';
import Plugin from 'src/plugin-system/plugin.class';

export default class FastorderPlugin extends Plugin {

    init() {
        console.log("FastorderPlugin init");
        let self = this;

        // initialize the HttpClient
        this._client = new HttpClient();
        this._api_suggest = '/fast-order/suggest/';
        this.node = this.el.children['fast-order'];

        this._registerEventProducts();
        this._registerEventQuantity();
        this._setAutocompleteHide();
    }

    _registerEventProducts() {
        this._selected = null;
        let inputs = this.node.querySelectorAll(`[data-id^="products_"]`);
        const events = "input".split(' ');
        for (let i = 0; i < inputs.length; i++) {
            // loop all inputs from form
            for (let ev = 0, eventsCount = events.length; ev < eventsCount; ev++) {
                // register multiple events for each input
                inputs[i].addEventListener(events[ev], (event) => {
                    let query_search = event.target.value.trim();
                    inputs[i].setAttribute('data-q', '');
                    this._calculateShoppingBasket();

                    if (query_search.length >= 3) {
                        this._selected = inputs[i];
                        this._client.get(this._api_suggest + encodeURIComponent(query_search),
                            this._setContent.bind(this), 'application/json', true)
                    }
                });

            }

        }
    }

    _registerEventProductSelect() {
        let links = this.node.querySelectorAll('.fast-order-link');
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", (event) => {
                let data_id = event.target.closest('a').getAttribute("data-id");
                let data_price = event.target.closest('a').getAttribute("data-price");
                let placeholder = event.target.closest('.fastorder-autocomplete');
                let input = placeholder.previousElementSibling;
                if (input.classList.contains('fast-order-input')) {
                    input.value = data_id;
                    input.setAttribute('data-q', data_price);
                    this._calculateShoppingBasket();
                }
                this._setAutocompleteHide();
            });
        }
    }

    _registerEventQuantity() {
        let inputs = this.node.querySelectorAll(`[data-id^="quantity_"]`);
        const events = "input".split(' ');
        for (let i = 0; i < inputs.length; i++) {
            // loop all inputs from form
            for (let ev = 0, eventsCount = events.length; ev < eventsCount; ev++) {
                // register multiple events for each input
                inputs[i].addEventListener(events[ev], (event) => {
                    inputs[i].setAttribute('data-q', event.target.value);
                    this._calculateShoppingBasket();

                });

            }

        }
    }

    _setContent(content) {
        let input = this._selected;
        let placeholder = input.nextElementSibling;

        if (placeholder.classList.contains('fastorder-autocomplete')) {
            placeholder.innerHTML = content;
            placeholder.style.display = 'block';
        }
        this._registerEventProductSelect();
    }

    _setAutocompleteHide() {
        document.body.addEventListener("click", (event) => {
            [].forEach.call(document.querySelectorAll('.fastorder-autocomplete'), function (el) {
                el.style.display = 'none';
            });
        });

    }

    _calculateShoppingBasket() {

        let total = 0;
        let row = this.node.querySelectorAll(`[data-type="fast-order-row"]`);

        for (let i = 0; i < row.length; i++) {
            let price = row[i].querySelector(`[data-id^="products_"]`);
            if (price != null) {
                price = parseFloat(price.getAttribute("data-q"));
            }

            let quantity = row[i].querySelector(`[data-id^="quantity_"]`);
            if (quantity != null) {
                quantity = parseInt(quantity.getAttribute("data-q"));
            }

            if (quantity > 0 && price > 0) {
                total += quantity * price;
            }

        }

        console.log(total);

        this.node.querySelector("#fast-order-total-amount").innerHTML = total.toFixed(2);

    }
}