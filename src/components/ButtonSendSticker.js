import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';



export function ButtonSendSticker(props) {
    const [isOpen, setOpenState] = React.useState('');

    return (
        <Box
            styleSheet={{
                position: 'relative',
            }}
        >
            <Button
                buttonColors={{
                    backgroundColor: '#e03c14',
                }}
                styleSheet={{
                    borderRadius: '15%',
                    //   padding: '0 0 0 0',
                    minWidth: '44px',
                    minHeight: '44px',
                    fontSize: '20px',
                    marginBottom: '8px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e03c14',
                    marginTop: '10px',
                    marginLeft: '5px',
                    //   filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
                    hover: {
                        backgroundColor: '#8b250c',
                    }
                }}
                label="😋"
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        width: {
                            xs: '200px',
                            sm: '290px',
                        },
                        height: '300px',
                        right: '30px',
                        bottom: '90px',
                        padding: '16px 5px',
                        alignItems: 'center',
                        boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Text
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals["000"],
                            fontWeight: 'bold',
                        }}
                    >
                        GIFs and Stickers
                    </Text>
                    <Box
                        tag="ul"
                        styleSheet={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '10px',
                            overflowY: 'scroll',
                            marginRight: '2px',
                        }}
                    >
                        {appConfig.stickers.map((sticker) => (
                            <Text
                                onClick={() => {
                                    // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                tag="li" key={sticker}
                                styleSheet={{
                                    width: '50%',
                                    borderRadius: '5px',
                                    padding: '8px',
                                    focus: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    },
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    }
                                }}
                            >
                                <Image src={sticker} />
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}