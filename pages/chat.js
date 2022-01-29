import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
// import username from '../pages/index';
// import { srcImage } from './index';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5Njc3NSwiZXhwIjoxOTU4OTcyNzc1fQ.x-jXawXP017VoD8lZeQ7bFZJSLuPf1-BI5ksNbQ6s6Y';
const SUPABASE_URL = 'https://ogmfcfmngvizebxeoele.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}


export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const { username } = roteamento.query;
    // const username = 'oKrolik';

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });
        const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens:', listaDeMensagens);
            // Quero reusar um valor de referencia (objeto/array) 
            // Passar uma função pro setState

            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens
            // ])
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);


    function handleNovaMensagem(novaMensagem) {
        if (!novaMensagem?.length) { return; };
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: username,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
            });


        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                // backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images4.alphacoders.com/587/587508.png)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000'], backgroundPosition: 'center',
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 90%)',
                    borderRadius: '4px',
                    // backgroundColor: appConfig.theme.colors.neutrals[700],
                    backgroundColor: 'rgba(33,41,49,0.9)',
                    height: '75%',
                    maxWidth: '85%',
                    maxHeight: '95vh',
                    padding: '8px',
                    marginBottom: '30px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        // backgroundColor: appConfig.theme.colors.neutrals[600],
                        backgroundColor: 'rgba(41,51,61,0.8)',
                        flexDirection: 'column',
                        borderRadius: '4px',
                        padding: '4px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} atualizaListaMsgs={setListaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '4px',
                                marginTop: '10px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                // marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/* CallBack */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        <Button
                            disabled={!mensagem?.length} // botão desativado se não houver mensagempara envio
                            onClick={(event) => {
                                handleNovaMensagem(mensagem);
                            }}
                            iconName="FaArrowRight" //FaArrowRight //FaAngleRight
                            colorVariant="dark"
                            type="submit"
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                borderRadius: '15%',
                                marginLeft: '5px',
                                marginBottom: '1px',
                                resize: 'none',
                                padding: '6px 8px 8px 8px',
                                backgroundColor: '#65e96b',
                                marginRight: '4px',
                                color: appConfig.theme.colors.neutrals[700],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const { username } = roteamento.query;

    // console.log(props);
    function handleDeleteMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: username,
            texto: novaMensagem,
        };
        supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: novaMensagem })
            .then(({ data }) => {
                console.log('Apagando mensagem: ', data);
                setListaDeMensagens(listaDeMensagens.filter(function (data) {
                    return !data.delete
                }));
            })
    }
    function deleteMensagemComId(idMensagem) {
        const novaListaMsg = props.mensagens.filter((mensagem) => mensagem.id != idMensagem);
        props.atualizaListaMsgs(novaListaMsg);
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '5px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                const roteamento = useRouter();
                const { username } = roteamento.query;
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '4px',
                            padding: '3px',
                            marginBottom: '5px',
                            marginRight: '5px',
                            marginBottom: '-1px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '6px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                // src={`https://github.com/oKrolik.png`}
                                src={username.length > 2 ? `https://github.com/${mensagem.de}.png` : `https://i.pinimg.com/564x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg`}
                            // src={`${srcImage(mensagem.de)}`}
                            />
                            <Icon
                                onClick={() => {
                                    console.log('clicou: ', mensagem);
                                    deleteMensagemComId(mensagem.id);
                                    handleDeleteMensagem(mensagem.id);
                                }}
                                label="Icon Component"
                                name="FaTrash"
                                styleSheet={{
                                    float: 'right',
                                    marginRight: '2px',
                                    width: '10px',
                                    height: '15px',
                                    hover: {
                                        Color: '#df4141',
                                    }
                                }}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {/* {(new Date().toLocaleDateString())} */}
                                {new Date(mensagem.created_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                            </Text>
                        </Box>
                        <Text
                            styleSheet={{
                                fontSize: '14px',
                                wordBreak: 'break-word'
                            }}
                        >
                            {/* {mensagem.texto} */}
                            {/* [Declarativo] */}
                            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                            {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')}
                                        styleSheet={{
                                            width: '150px',
                                            height: '100px',
                                        }}
                                    />

                                )
                                : (
                                    mensagem.texto
                                )}
                            {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
                            {/* {mensagem.texto} */}
                        </Text>

                    </Text>
                );
            })}
        </Box>
    )
}