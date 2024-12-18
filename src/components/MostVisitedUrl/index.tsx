import {Container} from "../Container";
import {useEffect, useState} from "react";
import {api} from "../../services/axios.ts";

type UrlType = {
    alias: string
    original_url: string
    short_url: string
    access_count: number
}

export function MostVisitedUrl() {
    const [mostVisitedUrls, setMostVisitedUrls] = useState<UrlType[]>([])
    useEffect(() => {
        api
            .get('/api/v1/url-shorten/most-visited')
            .then(response => {
                setMostVisitedUrls(response.data)
            })
            .catch(err => console.error(err))
    }, [])
    return (
        <Container>
            <div className={'w-full bg-white p-3 mt-4 rounded-lg max-h-72 overflow-auto'}>
                <div>
                    <p className={'text-lg font-bold'}>Top 10 URLs mais visitadas</p>
                </div>

                <table className={'w-full'}>
                    <thead>
                    <tr>
                        <th className={'text-left'}>Rank</th>
                        <th className={'text-left'}>URL Original</th>
                        <th className={'text-left'}>URL Curta</th>
                        <th className={'text-left'}>Visitas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostVisitedUrls.length > 0 && mostVisitedUrls.map((url, index) => (
                        <tr key={index}>
                            <td>#{index + 1}</td>
                            <td>
                                <a href={url.original_url} target={'_blank'}>
                                    {url.original_url}
                                </a>
                            </td>

                            <td>
                                <a href={url.short_url} target={'_blank'}>
                                    {url.short_url}
                                </a>
                            </td>

                            <td>{url.access_count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {mostVisitedUrls.length == 0 && <p className={'text-center my-5'}>Sem urls por enquanto!</p>}
            </div>
        </Container>

    )
}