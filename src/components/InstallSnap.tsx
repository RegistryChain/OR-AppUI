import { useContext, useEffect, useState } from 'react'
import { connectSnap, getSnap } from '../utils/snap'

import { background, Button } from '@chakra-ui/react'


export function InstallSnap({ displayManualInstall }: any) {
    const [isFlaskBool, setIsFlaskBool] = useState<Boolean>(false)

    useEffect(() => {
        if (!window?.ethereum?.isConnected()) {
            window?.ethereum?.enable()
        }
        if (!displayManualInstall) {
            installOrSnap()
        }
    }, [])


    useEffect(() => {
        const provider: any = window;
        const providerEth = provider.ethereum;
        isFlask(providerEth)
    }, [])

    const installOrSnap = async () => {
        await connectSnap();
    }

    const isFlask = async (providerEth: any) => {
        try {
            const clientVersion = await providerEth?.request({
                method: 'web3_clientVersion',
            });
            const isFlaskDetected = (clientVersion as string[])?.includes('flask');
            setIsFlaskBool(isFlaskDetected)
            return Boolean(providerEth && isFlaskDetected);
        } catch {
            return false;
        }
    };

    let button = null;
    if (displayManualInstall) {
        button = 
            <Button   disabled={window.ethereum.networkVersion + "" !== "11155111" + "" || !isFlaskBool} onClick={installOrSnap}>
                OR Snap {String.fromCodePoint(0x1F98A)}
            </Button>
    }

    return button
}

export default InstallSnap
