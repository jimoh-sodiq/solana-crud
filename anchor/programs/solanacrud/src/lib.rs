#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solanacrud {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanacrud>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanacrud.count = ctx.accounts.solanacrud.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanacrud.count = ctx.accounts.solanacrud.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanacrud>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanacrud.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanacrud<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanacrud::INIT_SPACE,
  payer = payer
  )]
  pub solanacrud: Account<'info, Solanacrud>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanacrud<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanacrud: Account<'info, Solanacrud>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanacrud: Account<'info, Solanacrud>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanacrud {
  count: u8,
}
