import { apiUrl } from '../config'
import * as $ from 'jquery';


const apiMiddleware = store => next => action => {
  var type = action.type;
    if (action.api) {
        _doRequest(action).done(function(data){
            action.type = type;
            action.data = data;
            delete action.api;
            next(action);
        }).fail(function(data){
            action.type = type + "__ERROR";
            action.data = data;
            next(action); 
        });
        action.type = type + "__PENDING";
        next(action);
    } else {
        next(action);
    }
}

const _doRequest = function(action) {
    const dfd = $.Deferred();

    action.api.url = apiUrl + action.api.url;

    $.ajax( action.api )
    .done(function(data){
        dfd.resolve(data);
    })
    .fail(function(err){
        dfd.reject(err);
    });

    return dfd.promise();
}

export default apiMiddleware