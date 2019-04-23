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
'use strict';
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = class PayWhirl {
    constructor(APIKey, APISecret) {
        this.host_ = 'https://api.paywhirl.com';
        this.headers_ = new fetch.Headers();
        this.headers_.append('api_key', APIKey);
        this.headers_.append('api_secret', APISecret);
    }

    getCustomers(data = null) {
        return this.getPromise_('/customers', data);
    }

    getCustomer(customerId = null) {
        return this.getPromise_(`/customer/${ customerId }`);
    }

    // return all addresses associated with a customer Id
    getAddresses(customerId = null) {
        return this.getPromise_(`/customer/addresses/${ customerId }`);
    }

    // return a single address based on address Id
    getAddress(addressId = null) {
        return this.getPromise_(`/customer/address/${ addressId }`);
    }

    // return the full customer profile (customer, addresses, and profile questions)
    getProfile(customerId = null) {
        return this.getPromise_(`/customer/profile/${ customerId }`);
    }

    authCustomer(email = null, password = null) {
        return this.postPromise_('/auth/customer', {email: email, password: password});
    }

    createCustomer(data = null) {
        return this.postPromise_('/create/customer', data);
    }

    updateCustomer(data = null) {
        return this.postPromise_('/update/customer', data);
    }

    updateAnswer(data = null) {
        return this.postPromise_('/update/answer', data);
    }

    getQuestions(data = null) {
        return this.getPromise_('/questions', data);
    }

    getAnswers(data = null) {
        return this.getPromise_('/answers', data);
    }

    getPlans(data = null) {
        return this.getPromise_('/plans', data);
    }

    getPlan(customerId = null) {
        return this.getPromise_(`/plan/${ customerId }`);
    }

    createPlan(data = null) {
        return this.postPromise_('/create/plan', data);
    }

    updatePlan(data = null) {
        return this.postPromise_('/update/plan', data);
    }

    getSubscriptions(customerId = null) {
        return this.getPromise_(`/subscriptions/${ customerId }`);
    }

    getSubscription(customerId = null) {
        return this.getPromise_(`/subscription/${ customerId }`);
    }

    getSubscribers(data = null) {
        return this.getPromise_('/subscribers', data);
    }

    subscribeCustomer(customerData) {
        return this.postPromise_('/subscribe/customer', customerData);
    }

    updateSubscription(subscriptionId = null, planId = null, quantity = null) {
        let data = {
            subscription_id: subscriptionId,
            plan_id: planId,
        };

        if (quantity) {
            data.quantity = quantity;
        }

        return this.postPromise_('/update/subscription', data);
    }

    unsubscribeCustomer(subscriptionId = null) {
        let data = {subscription_id: subscriptionId};
        return this.postPromise_('/unsubscribe/customer', data);
    }

    getInvoice(customerId = null) {
        return this.getPromise_(`/invoice/${ customerId }`);
    }

    getInvoices(customerId = null, data = null) {
        return this.getPromise_(`/invoices/${ customerId }`, data);
    }

    processInvoice(invoiceId = null) {
        return this.postPromise_(`/invoices/${ invoiceId }/process`);
    }

    markInvoiceAsPaid(invoiceId = null) {
        return this.postPromise_(`/invoices/${ invoiceId }/mark-as-paid`);
    }

    updateInvoiceCard(invoiceId = null, cardId = null) {
        let data = {
            card_id: cardId,
        };
        return this.postPromise_(`/invoices/${ invoiceId }/card`, data);
    }

    updateInvoiceItems(invoiceId = null, lineItems = null) {
        return this.postPromise_(`/invoices/${ invoiceId }/items`, lineItems);
    }
    createInvoice(data = null) {
        return this.postPromise_(`/invoices`, data);
    }

    getGateways() {
        return this.getPromise_('/gateways');
    }

    getGateway(customerId = null) {
        return this.getPromise_(`/gateway/${ customerId }`);
    }

    createCharge(data = null) {
        return this.postPromise_('/create/charge', data);
    }

    getCharge(customerId = null) {
        return this.getPromise_(`/charge/${ customerId }`);
    }

    getCard(customerId = null) {
        return this.getPromise_(`/card/${ customerId }`);
    }

    getCards(customerId = null) {
        return this.getPromise_(`/cards/${ customerId }`);
    }

    createCard(data = null) {
        return this.postPromise_('/create/card', data);
    }

    deleteCard(cardID = null) {
        let data = null;
        if (cardID) {
            data = {id: cardID};
        }
        return this.postPromise_(`/delete/card`, data);
    }

    getPromos() {
        return this.getPromise_(`/promo`);
    }

    getPromo(customerId = null) {
        return this.getPromise_(`/promo/${ customerId }`);
    }

    createPromo(data = null) {
        return this.postPromise_('/create/promo', data);
    }

    deletePromo(promoID = null) {
        let data = null;
        if (promoID) {
            data = {id: promoID};
        }
        return this.postPromise_(`/delete/promo`, data);
    }

    getEmailTemplate(customerId = null) {
        return this.getPromise_(`/email/${ customerId }`);
    }

    sendEmail(request = null) {
        return this.postPromise_(`/send-email`, request);
    }

    getAccount() {
        return this.getPromise_('/account');
    }

    getStats() {
        return this.getPromise_('/stats');
    }

    getShippingRules() {
        return this.getPromise_(`/shipping`);
    }

    getShippingRule(ruleID = null) {
        return this.getPromise_(`/shipping/${ ruleID }`);
    }

    getTaxRules() {
        return this.getPromise_(`/tax`);
    }

    getTaxRule(customerId = null) {
        return this.getPromise_(`/tax/${ customerId }`);
    }

    getMultiAuthToken(data = null) {
        return this.postPromise_('/multiauth', data);
    }


    // private helper methods below this point
    requestHelper_(requestType, uriEndpoint, data = null) {
        let qs = '';
        let host = this.host_ + uriEndpoint;
        if (data) {
            qs = querystring.stringify(data);
            host = host + '?' + qs;
        }

        let init = {
            method: requestType,
            headers: this.headers_,
            port: this.port_,
        };

        let request = new fetch.Request(host, init);
        return fetch(request);
    }


    promiseBuilder_(requestType, uriEndpoint, data = null) {
        let returnPromise = new Promise((resolved, failed) => {
        this.requestHelper_(requestType, uriEndpoint, data)
            .then((result) => {
                resolved(result.json());
            })
            .catch((error) => {
                failed(error);
            });
        });

        return returnPromise;
    }

    postPromise_(uriEndpoint, data = null) {
        return this.promiseBuilder_('POST', uriEndpoint, data);
    }

    getPromise_(uriEndpoint, data = null) {
        return this.promiseBuilder_('GET', uriEndpoint, data);
    }
};