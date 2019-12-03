/* PayWhirl API Node Library
 *
 * Documentation can be obtained at https://api.paywhirl.com
 *
 * Each public function in this library, whether it be
 * a GET or a POST will return a Promise object.
 *
 * More information about Promises can be found at
 * https://developers.google.com/web/fundamentals/primers/promises
 *
 * Example Usage:
 * =====================
 * let data = { limit: 2 };
 *
 * paywhirl.getCustomers(data)
 *   .then((result) => {console.log(result);})
 *   .catch((error) => {console.log(error);});
 *
 *
 * Dependencies:
 * node-fetch and querystring can be obtained via npm
 */

const fetch = require('node-fetch');
const querystring = require('querystring');
const https = require('https');

module.exports = class PayWhirl {
    constructor(APIKey, APISecret, host = 'https://api.paywhirl.com', rejectUnauthorized = true) {
        this._host = host;
        this._headers = new fetch.Headers();
        this._headers.append('api_key', APIKey);
        this._headers.append('api_secret', APISecret);
        this._httpsAgent = new https.Agent({
            rejectUnauthorized,
        });
    }

    getCustomers(data = null) {
        return this._get('/customers', data);
    }

    getCustomer(customerId = null) {
        return this._get(`/customer/${customerId}`);
    }

    // return all addresses associated with a customer Id
    getAddresses(customerId = null) {
        return this._get(`/customer/addresses/${customerId}`);
    }

    // return a single address based on address Id
    getAddress(addressId = null) {
        return this._get(`/customer/address/${addressId}`);
    }

    // return the full customer profile (customer, addresses, and profile questions)
    getProfile(customerId = null) {
        return this._get(`/customer/profile/${customerId}`);
    }

    authCustomer(email = null, password = null) {
        return this._post('/auth/customer', { email, password });
    }

    createCustomer(data = null) {
        return this._post('/create/customer', data);
    }

    updateCustomer(data = null) {
        return this._post('/update/customer', data);
    }

    deleteCustomer(customerId = null, forget = null) {
        let data = null;
        if (customerId) {
            data = { id: customerId };
        }
        if (forget !== null) {
            data.forget = forget;
        }
        return this._post('/delete/customer', data);
    }

    updateAnswer(data = null) {
        return this._post('/update/answer', data);
    }

    getQuestions(data = null) {
        return this._get('/questions', data);
    }

    getAnswers(data = null) {
        return this._get('/answers', data);
    }

    getPlans(data = null) {
        return this._get('/plans', data);
    }

    getPlan(customerId = null) {
        return this._get(`/plan/${customerId}`);
    }

    createPlan(data = null) {
        return this._post('/create/plan', data);
    }

    updatePlan(data = null) {
        return this._post('/update/plan', data);
    }

    getSubscriptions(customerId = null) {
        return this._get(`/subscriptions/${customerId}`);
    }

    getSubscription(customerId = null) {
        return this._get(`/subscription/${customerId}`);
    }

    getSubscribers(data = null) {
        return this._get('/subscribers', data);
    }

    subscribeCustomer(customerData) {
        return this._post('/subscribe/customer', customerData);
    }

    updateSubscription(subscriptionId = null, planId = null, quantity = null, addressId = null,
        installmentsLeft = null, trialEnd = null, cardId = null) {
        const data = {
            subscription_id: subscriptionId,
            plan_id: planId,
        };

        if (quantity) {
            data.quantity = quantity;
        }
        if (addressId) {
            data.address_id = addressId;
        }
        if (installmentsLeft) {
            data.installments_left = installmentsLeft;
        }
        if (trialEnd) {
            data.trial_end = trialEnd;
        }
        if (cardId) {
            data.card_id = cardId;
        }

        return this._post('/update/subscription', data);
    }

    unsubscribeCustomer(subscriptionId = null) {
        const data = { subscription_id: subscriptionId };
        return this._post('/unsubscribe/customer', data);
    }

    getInvoice(customerId = null) {
        return this._get(`/invoice/${customerId}`);
    }

    getInvoices(customerId = null, data = null) {
        return this._get(`/invoices/${customerId}`, data);
    }

    processInvoice(invoiceId = null, data = null) {
        return this._post(`/invoices/${invoiceId}/process`, data);
    }

    markInvoiceAsPaid(invoiceId = null) {
        return this._post(`/invoices/${invoiceId}/mark-as-paid`);
    }

    addPromoCodeToInvoice(invoiceId = null, promoCode = null) {
        const data = { promo_code: promoCode };
        return this._post(`/invoices/${invoiceId}/add-promo`, data);
    }

    removePromoCodeFromInvoice(invoiceId = null) {
        return this._post(`/invoices/${invoiceId}/remove-promo`);
    }

    updateInvoiceCard(invoiceId = null, cardId = null) {
        const data = {
            card_id: cardId,
        };
        return this._post(`/invoices/${invoiceId}/card`, data);
    }

    updateInvoiceItems(invoiceId = null, lineItems = null) {
        return this._post(`/invoices/${invoiceId}/items`, lineItems);
    }

    createInvoice(data = null) {
        return this._post('/invoices', data);
    }

    deleteInvoice(invoiceID = null) {
        const data = {
            id: invoiceID,
        };
        return this._post('/delete/invoice', data);
    }

    getGateways() {
        return this._get('/gateways');
    }

    getGateway(customerId = null) {
        return this._get(`/gateway/${customerId}`);
    }

    createCharge(data = null) {
        return this._post('/create/charge', data);
    }

    getCharge(chargeId = null) {
        return this._get(`/charge/${chargeId}`);
    }

    refundCharge(chargeId = null, data = null) {
        return this._post(`/refund/charge/${chargeId}`, data);
    }

    getCard(customerId = null) {
        return this._get(`/card/${customerId}`);
    }

    getCards(customerId = null) {
        return this._get(`/cards/${customerId}`);
    }

    createCard(data = null) {
        return this._post('/create/card', data);
    }

    deleteCard(cardID = null) {
        let data = null;
        if (cardID) {
            data = { id: cardID };
        }
        return this._post('/delete/card', data);
    }

    getPromos() {
        return this._get('/promo');
    }

    getPromo(customerId = null) {
        return this._get(`/promo/${customerId}`);
    }

    createPromo(data = null) {
        return this._post('/create/promo', data);
    }

    deletePromo(promoID = null) {
        let data = null;
        if (promoID) {
            data = { id: promoID };
        }
        return this._post('/delete/promo', data);
    }

    getEmailTemplate(customerId = null) {
        return this._get(`/email/${customerId}`);
    }

    sendEmail(request = null) {
        return this._post('/send-email', request);
    }

    getAccount() {
        return this._get('/account');
    }

    getStats() {
        return this._get('/stats');
    }

    getShippingRules() {
        return this._get('/shipping');
    }

    getShippingRule(ruleID = null) {
        return this._get(`/shipping/${ruleID}`);
    }

    getTaxRules() {
        return this._get('/tax');
    }

    getTaxRule(customerId = null) {
        return this._get(`/tax/${customerId}`);
    }

    getMultiAuthToken(data = null) {
        return this._post('/multiauth', data);
    }

    // private helper methods below this point
    _request(method, endpoint, data = null) {
        let qs = '';
        let host = this._host + endpoint;
        if (data) {
            qs = querystring.stringify(data);
            host = `${host}?${qs}`;
        }

        const init = {
            method: method,
            headers: this._headers,
            port: this._port,
            agent: this._httpsAgent,
        };

        const request = new fetch.Request(host, init);

        return fetch(request).then(function(res) { return res.json(); });
    }

    _post(endpoint, data = null) {
        return this._request('POST', endpoint, data);
    }

    _get(endpoint, data = null) {
        return this._request('GET', endpoint, data);
    }
};
