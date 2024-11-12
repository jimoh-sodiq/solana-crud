import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanacrud} from '../target/types/solanacrud'

describe('solanacrud', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanacrud as Program<Solanacrud>

  const solanacrudKeypair = Keypair.generate()

  it('Initialize Solanacrud', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanacrud: solanacrudKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanacrudKeypair])
      .rpc()

    const currentCount = await program.account.solanacrud.fetch(solanacrudKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanacrud', async () => {
    await program.methods.increment().accounts({ solanacrud: solanacrudKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacrud.fetch(solanacrudKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanacrud Again', async () => {
    await program.methods.increment().accounts({ solanacrud: solanacrudKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacrud.fetch(solanacrudKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanacrud', async () => {
    await program.methods.decrement().accounts({ solanacrud: solanacrudKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacrud.fetch(solanacrudKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanacrud value', async () => {
    await program.methods.set(42).accounts({ solanacrud: solanacrudKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanacrud.fetch(solanacrudKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanacrud account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanacrud: solanacrudKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanacrud.fetchNullable(solanacrudKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
