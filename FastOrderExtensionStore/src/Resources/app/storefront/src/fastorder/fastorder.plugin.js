const client = new StoreApiClient();

import Plugin from "src/plugin-system/plugin.class";
import StoreApiClient from "src/service/store-api-client.service";

export default class FastorderPlugin extends Plugin {
    init() {
        this._client = new StoreApiClient();
        this.fetchData();
    }

    fetchData() {
        this._client.get("store-api/checkout/search", this.handleData);
    }

    handleData(response) {
        console.log(response);
    }
}
console.log("FastorderPlugin init");
