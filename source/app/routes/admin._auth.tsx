import React from "react"
import { Layout, LegacyCard, Page } from "@shopify/polaris"
import { Outlet } from "@remix-run/react"

export default function AdminAuth(){
    return(
        <Page narrowWidth>
        <Layout>
            <Layout.Section>
                <Outlet />
            </Layout.Section>
        </Layout>
        </Page>
    )
}