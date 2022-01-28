import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
    console.log(props);
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    // const username = 'oKrolik';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    //const { username } = roteamento.query;

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    // backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://images4.alphacoders.com/587/587508.png)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', 
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '4px', padding: '32px', margin: '16px',
                        boxShadow: '0 7px 10px 0 rgb(0 0 0 / 90%)',
                        // backgroundColor: appConfig.theme.colors.neutrals[700],
                        // opacity: 0.9,
                        backgroundColor: 'rgba(33,41,49,0.9)',
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log("Alguém submeteu o form");
                            roteamento.push(`/chat?username=${username}`);
                            // window.location.href = '/chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/* <input 
                            type="text"
                            value={username}
                            onChange={function (event) {
                                console.log('usuário digitou', event.target.value);
                                // Onde ta o valor?
                                const valor = event.target.value;
                                // Trocar o valor da variável
                                // através do React
                                setUsername(valor);
                            }}
                        /> */}
                        {/* <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        /> */}
                        <TextField
                            fullWidth
                            value={username} // Valor da variavel
                            onChange={
                                function handler(event) { // Uma função de handler, que pega o que o usuário fez
                                    const valor = event.target.value; // Define uma variavel para armazenar o dado. O dado é, o valor do que foi alvo do evento. (no caso o clique na tecla)
                                    setUsername(valor); // Seta um novo valor para a Username

                                }
                            }
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800], //900
                            border: '1px solid', //none
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '4px', //10px
                            // boxShadow: 'rgba(0 0 0 / 0.911) 10px 10px 10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={username.length > 2 ? `https://github.com/${username}.png` : `https://i.pinimg.com/564x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                // color: appConfig.theme.colors.neutrals[100],
                                // backgroundColor: '#3c4c5c',
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px',//100px
                                // borderColor: 'rgb(0 0 0)'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}