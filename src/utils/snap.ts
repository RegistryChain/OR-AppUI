
/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async () => {
  const win: any = window
  return (await win.ethereum.request({
    method: 'wallet_getSnaps',
  })) as any;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = (process.env.SNAP_ID || "npm:or-snap"),
  params: Record<'version' | string, unknown> = {},
) => {

  const win: any = window
  await win.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<any> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap: any) =>
        snap.id === (process.env.SNAP_ID || "npm:or-snap") && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
