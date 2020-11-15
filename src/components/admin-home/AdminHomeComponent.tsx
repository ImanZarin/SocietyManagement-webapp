import React from 'react';

function AdminHomeComponent(): JSX.Element {
    return (
        <div className="row mt-3">
            <button className="btn btn-primary btn-large btn-block col-5 m-auto">OWNERS</button>
            <button className="btn btn-primary btn-large btn-block col-5 m-auto">TENANTS</button>
        </div>
    );
}

export default AdminHomeComponent;