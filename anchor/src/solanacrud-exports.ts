// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanacrudIDL from '../target/idl/solanacrud.json'
import type { Solanacrud } from '../target/types/solanacrud'

// Re-export the generated IDL and type
export { Solanacrud, SolanacrudIDL }

// The programId is imported from the program IDL.
export const SOLANACRUD_PROGRAM_ID = new PublicKey(SolanacrudIDL.address)

// This is a helper function to get the Solanacrud Anchor program.
export function getSolanacrudProgram(provider: AnchorProvider) {
  return new Program(SolanacrudIDL as Solanacrud, provider)
}

// This is a helper function to get the program ID for the Solanacrud program depending on the cluster.
export function getSolanacrudProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanacrud program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANACRUD_PROGRAM_ID
  }
}
