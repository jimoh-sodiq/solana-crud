'use client'

import {getSolanacrudProgram, getSolanacrudProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

interface CreateEntryArgs {
  title: string;
  message: string;
  owner: PublicKey
}


export function useSolanacrudProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getSolanacrudProgramId(cluster.network as Cluster), [cluster])
  const program = getSolanacrudProgram(provider)

  const accounts = useQuery({
    queryKey: ['solanacrud', 'all', { cluster }],
    queryFn: () => program.account.solanacrud.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  // const createEntry = useMutation<string, Error, CreateEntryArgs>({
  //   mutationKey: ['journalEntry', 'create',  {cluster}],
  //   mutationFn: async ({title, message, owner}) => {
  //     return program.methods.createJournalEntry(title, message).rpc()
  //   }
  // })


  return {
    program,
    programId,
    accounts,
    getProgramAccount,
  }
}

export function useSolanacrudProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolanacrudProgram()

  const accountQuery = useQuery({
    queryKey: ['solanacrud', 'fetch', { cluster, account }],
    queryFn: () => program.account.solanacrud.fetch(account),
  })
  


  // const setMutation = useMutation({
  //   mutationKey: ['solanacrud', 'set', { cluster, account }],
  //   mutationFn: (value: number) => program.methods.set(value).accounts({ solanacrud: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx)
  //     return accountQuery.refetch()
  //   },
  // })

  return {
    accountQuery,
  }
}
