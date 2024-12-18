import {Input} from "../Input";
import {Container} from "../Container";
import {FormEvent, useState} from "react";
import {api} from "../../services/axios.ts";
import {Modal} from "../Modal";
import {Clipboard} from "../Clipboard";

type UrlResultType = {
    alias: string
    original_url: string
    short_url: string
    processing_time_in_ms: number

}

export function ShortenerUrlForm() {
    const [customUrlChecked, setCustomUrlChecked] = useState(false)
    const [customUrl, setCustomUrl] = useState<string>('')
    const [alias, setAlias] = useState<string>('')
    const [urlResult, setUrlResult] = useState<UrlResultType>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        api.post('/api/v1/url-shorten', {
            original_url: customUrl,
            alias: alias
        })
            .then(response => {
                setUrlResult(response.data)
                setIsModalOpen(true)
                setCustomUrl('')
                setAlias('')
                setCustomUrlChecked(false)
            }).catch(err => alert(err.response.data.description))


    }

    return (
        <Container>
            <form className={'w-full bg-white p-4 mt-4 rounded-lg'} onSubmit={handleSubmit}>
                <div>
                    <label>URL</label>
                    <Input
                        placeholder={"Digite a URL"}
                        type={'url'}
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        required
                    />
                </div>
                <div className={'flex gap-2 items-center py-2'}>
                    <label>Customizar link</label>
                    <input
                        type={'checkbox'}
                        checked={customUrlChecked}
                        onChange={() => setCustomUrlChecked(!customUrlChecked)}
                    />
                </div>
                <div>
                    {
                        customUrlChecked && (
                            <div>
                                <Input
                                    placeholder={"Digite o link customizado"}
                                    type={'text'}
                                    value={alias}
                                    onChange={(e) => setAlias(e.target.value)}
                                />
                                <span className={'text-sm text-zinc-400 opacity-80'}>Esse será o final da url. ex: www.shortener.com/{alias}</span>
                            </div>
                        )
                    }
                </div>
                <div className={'my-3'}>
                    <button
                        className={'w-full px-4 py-2 text-lg text-white bg-[#282c34] rounded-md'}
                        type={'submit'}
                    >Encurtar
                    </button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {urlResult && (
                    <div className={'flex flex-col gap-3'}>
                        <Clipboard content={urlResult.short_url}/>
                        <p>
                            <strong>Original:</strong> {urlResult.original_url}
                        </p>
                        <p><strong>Curta:</strong> {urlResult.short_url}</p>
                        <p><strong>Alias:</strong> {urlResult.alias}</p>
                        <p><strong>Tempo de Processamento:</strong> {urlResult.processing_time_in_ms} ms</p>
                    </div>
                )}
            </Modal>
        </Container>

    )
}