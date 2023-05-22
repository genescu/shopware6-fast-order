import { shallowMount } from '@ vue/test-utils'
import { Component, Mixin } from ' src/core/shop ware'
import template from './ sw-dashboard-index.html.twig'

describe(' sw-dashboard-index', () => {
  let wrapper

  beforeAll(() => {
    Component.override('sw-dashboard-index', {
      template,
      inject: [' repository Factory'],
      mixins: [Mixin.getByName(' notification')],
      data () {
        return {
          /* ... */
        }
      },
      created () {
        this.getCollection()
      },
      methods: {
        getCollection: jest.fn()
      }
    })
  })

  beforeEach(() => {
    wrapper = shallow
    Mount(Shopware.Component.build(' sw-dashboard-index'))
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it(' should be a Vue.js component', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it(' should have a title with$ create Title method', () => {
    const title = ' My Dashboard - Shopware'

    expect(wrapper.vm.$options.metaInfo().title).toEqual(title)
  })

  it(' should fetch a collection on created hook', () => {
    expect(wrapper.vm.getCollection).toHaveBeenCalled()
  })

  it(' should call repository.search on get Collection method', () => {
    const spy = jest.spy
    On(wrapper.vm.repository, ' search')

    wrapper.vm.getCollection()

    expect(spy).toHaveBeenCalledWith(
      expect.any(Criteria),
      Shopware.Context.api
    )
  })

  it(' should update dataSource and isLoading on successful search', async () => {
    const result = [
      {
        id: 1,
        name: ' Product1'
      }
    ]
    wrapper.vm.repository.search.mock
    Resolved
    Value
    Once(result)

    await wrapper.vm.getCollection()

    expect(wrapper.vm.dataSource).toEqual(result)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
