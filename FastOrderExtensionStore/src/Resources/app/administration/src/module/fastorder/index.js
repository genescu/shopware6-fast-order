import template from './sw-dashboard-index.html.twig';

console.log('fastorder administration init')

const {Component, Mixin} = Shopware;
const {Criteria} = Shopware.Data;

Component.override('sw-dashboard-index', {

    template,

    inject: [
        'repositoryFactory',
    ],

    mixins: [
        Mixin.getByName('notification')
    ],

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            isLoading: true,
            collection: [],
            dataSource: [],
            columns: [
                {property: 'product_number', label: 'Product Number'},
                {property: 'quantity', label: 'Quantity'},
                {property: 'created_at', label: 'Created at'}
            ],
        };
    },
    created() {
        this.getCollection();
    },
    methods: {
        getCollection: function () {
            const criteria = new Criteria();
            this.repository = this.repositoryFactory.create('fast_order');
            this.repository.search(criteria, Shopware.Context.api).then((result) => {
                this.dataSource = result;
                this.isLoading = false;
            })
        },
    }
});