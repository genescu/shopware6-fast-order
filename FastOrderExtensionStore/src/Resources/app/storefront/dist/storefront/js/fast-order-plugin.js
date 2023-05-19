(window.webpackJsonp = window.webpackJsonp || []).push([
  ['fast-order-plugin'],
  {
    S9XP: function (t, e, n) {
      'use strict'
      n.r(e)
      const r = n('k8s9')
      function o (t) {
        return (o =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function (t) {
              return typeof t
            }
            : function (t) {
              return t &&
                  typeof Symbol === 'function' &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                ? 'symbol'
                : typeof t
            })(t)
      }
      function i (t, e) {
        if (!(t instanceof e)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }
      function a (t, e) {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r)
        }
      }
      function u (t, e) {
        return !e || (o(e) !== 'object' && typeof e !== 'function')
          ? (function (t) {
              if (void 0 === t) {
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              }
              return t
            })(t)
          : e
      }
      function l (t) {
        return (l = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t)
          })(t)
      }
      function s (t, e) {
        return (s =
          Object.setPrototypeOf ||
          function (t, e) {
            return (t.__proto__ = e), t
          })(t, e)
      }
      const c = (function (t) {
        function e () {
          return i(this, e), u(this, l(e).apply(this, arguments))
        }
        let n, o, c
        return (
          (function (t, e) {
            if (typeof e !== 'function' && e !== null) {
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            }
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 }
            })),
            e && s(t, e)
          })(e, t),
          (n = e),
          (o = [
            {
              key: 'init',
              value: function () {
                console.log('FastorderPlugin init'),
                (this._client = new r.a()),
                (this._api_suggest = '/fast-order/suggest/'),
                (this.node = this.el.children['fast-order']),
                this._registerEventProducts(),
                this._registerEventQuantity(),
                this._setAutocompleteHide()
              }
            },
            {
              key: '_registerEventProducts',
              value: function () {
                const t = this
                this._selected = null
                for (
                  var e = this.node.querySelectorAll('[data-id^="products_"]'),
                    n = 'input'.split(' '),
                    r = function (r) {
                      for (let o = 0, i = n.length; o < i; o++) {
                        e[r].addEventListener(n[o], function (n) {
                          const o = n.target.value.trim()
                          e[r].setAttribute('data-q', ''),
                          t._calculateShoppingBasket(),
                          o.length >= 3 &&
                              ((t._selected = e[r]),
                              t._client.get(
                                t._api_suggest + encodeURIComponent(o),
                                t._setContent.bind(t),
                                'application/json',
                                !0
                              ))
                        })
                      }
                    },
                    o = 0;
                  o < e.length;
                  o++
                ) {
                  r(o)
                }
              }
            },
            {
              key: '_registerEventProductSelect',
              value: function () {
                for (
                  var t = this,
                    e = this.node.querySelectorAll('.fast-order-link'),
                    n = 0;
                  n < e.length;
                  n++
                ) {
                  e[n].addEventListener('click', function (e) {
                    const n = e.target.closest('a').getAttribute('data-id')
                    const r = e.target.closest('a').getAttribute('data-price')
                    const o = e.target.closest(
                      '.fastorder-autocomplete'
                    ).previousElementSibling
                    o.classList.contains('fast-order-input') &&
                      ((o.value = n),
                      o.setAttribute('data-q', r),
                      t._calculateShoppingBasket()),
                    t._setAutocompleteHide()
                  })
                }
              }
            },
            {
              key: '_registerEventQuantity',
              value: function () {
                for (
                  var t = this,
                    e = this.node.querySelectorAll('[data-id^="quantity_"]'),
                    n = 'input'.split(' '),
                    r = function (r) {
                      for (let o = 0, i = n.length; o < i; o++) {
                        e[r].addEventListener(n[o], function (n) {
                          e[r].setAttribute('data-q', n.target.value),
                          t._calculateShoppingBasket()
                        })
                      }
                    },
                    o = 0;
                  o < e.length;
                  o++
                ) {
                  r(o)
                }
              }
            },
            {
              key: '_setContent',
              value: function (t) {
                const e = this._selected.nextElementSibling
                e.classList.contains('fastorder-autocomplete') &&
                  ((e.innerHTML = t), (e.style.display = 'block')),
                this._registerEventProductSelect()
              }
            },
            {
              key: '_setAutocompleteHide',
              value: function () {
                document.body.addEventListener('click', function (t) {
                  [].forEach.call(
                    document.querySelectorAll('.fastorder-autocomplete'),
                    function (t) {
                      t.style.display = 'none'
                    }
                  )
                })
              }
            },
            {
              key: '_calculateShoppingBasket',
              value: function () {
                for (
                  var t = 0,
                    e = this.node.querySelectorAll(
                      '[data-type="fast-order-row"]'
                    ),
                    n = 0;
                  n < e.length;
                  n++
                ) {
                  let r = e[n].querySelector('[data-id^="products_"]')
                  r != null && (r = parseFloat(r.getAttribute('data-q')))
                  let o = e[n].querySelector('[data-id^="quantity_"]')
                  o != null && (o = parseInt(o.getAttribute('data-q'))),
                  o > 0 && r > 0 && (t += o * r)
                }
                this.node.querySelector('#fast-order-total-amount').innerHTML =
                  t.toFixed(2)
              }
            }
          ]) && a(n.prototype, o),
          c && a(n, c),
          e
        )
      })(n('FGIj').a)
      window.PluginManager.register('FastorderPlugin', c, '[data-fastorder]')
    }
  },
  [['S9XP', 'runtime', 'vendor-node', 'vendor-shared']]
])
