import { Fragment } from "react";
import React from 'react';
import { useQuery } from "@apollo/client";
import { myGQL } from "../../shared/myQuery.gql";
import { Loading } from "../LoadingComponent";
import { TDoc } from "../../shared/models";


export function HomeComponent(): JSX.Element {
    const {data, error, loading} = useQuery<{docs: TDoc[]}, any>(myGQL.GET_RECENT_Docs);

    if(loading) return <Loading/>;
    if(error) console.log(error);
    if(data) console.log(data.docs);
    return (<Fragment>

    </Fragment>);
}