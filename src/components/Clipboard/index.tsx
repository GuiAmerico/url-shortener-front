import React from 'react';
import {IoCopy} from "react-icons/io5";

export const Clipboard = ({ content }) => {
    const handleCopy = () => {
        navigator.clipboard
            .writeText(content)
            .then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar o link: ', err);
        });
    };

    return (
        <button onClick={handleCopy} style={{

        }}>
            <IoCopy size={24}/>
        </button>
    );
};
