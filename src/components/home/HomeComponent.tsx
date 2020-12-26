import { Fragment } from "react";
import React from 'react';
import { useQuery } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";


export function HomeComponent(): JSX.Element {
    const {data, error, loading} = useQuery(myGQL.GET_RECENT_Docs);

    if(loading) return <Loading/>;
    if(error) console.log(error);
    if(data) console.log(data);
    return (<Fragment>

    </Fragment>);
}