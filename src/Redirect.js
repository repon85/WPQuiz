import React from "react";
import validator from 'validator';


const Redirect = props => {
    const redirects = props.redirects || [];

    const addUrl = () => {
        redirects.push({ min: '', max: '', url: "" });
        props.update(redirects)
    }

    const removeUrl = (i) => {
        redirects.splice(i, 1);
        props.update(redirects)
    }

    const update_url = (val, i) => {
        redirects[i] = {...redirects[i], ...val}
        props.update(redirects)
    }

    return (
        <ul className="wpquiz-repeater wpquiz-repeater-redirect">
            <li className="head">
                <span className="number">Min</span>
                <span className="number">Max</span>
                <span className="main">Redirect URL</span>
                <span onClick={addUrl} className="btn-add wpquiz-btn purple small">Add New</span>
            </li>
            {redirects.map((r, i) =>
                <li key={i} data-no={i + 1}>
                    <input onChange={e => update_url({min: e.target.value}, i)} value={r.min} className="number" placeholder="Min" />
                    <input onChange={e => update_url({max: e.target.value}, i)} value={r.max} className="number" placeholder="Max" />
                    <input onChange={e => update_url({url: e.target.value}, i)} value={r.url} className="main" placeholder="Redirect URL" />
                    <span onClick={removeUrl.bind(this, i)} class="btn-remove dashicons dashicons-no-alt"></span>
                </li>
            )}
        </ul>
    );
};

export default Redirect;
