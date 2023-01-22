import {PUBLIC_CMS_URL} from "$env/static/public"

export async function load({params}) {
    console.log(params)
    const project = await (await fetch(`${PUBLIC_CMS_URL}/portfolios/${params.id}`)).json()
    console.log(project)
    return {project}
}