class NetworkManager {
    static networkManagerInstance = NetworkManager.networkManagerInstance == null ? new NetworkManager() : this.networkManagerInstance;
    async fetchRequest(api, method, parameters = {}) {
        let headers = {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };
        let url = api;
        if (!api) {
            return;
        }
        let timeout = 1000 * 60 * 0.5;
        let body = method == 'GET' ? null : method == 'DELETE' ? null : method == 'PUT' ? parameters : JSON.stringify(parameters);
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return error;
            });
    }
    async fetchMultiPartRequest(api, method, body, isXMLHttpRequest = false) {
        let headers = {
            "Accept": 'application/json',
            'Content-Type': 'multipart/form-data',
        }
        if (isXMLHttpRequest) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        let url = api;
        let timeout = 1000 * 60 * 2; // 2 mins
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                return error;
            });
    }
}
export default NetworkManager;