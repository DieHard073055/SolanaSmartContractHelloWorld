use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
};
use std::convert::TryInto;

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    let (key, rem) = instruction_data.split_first().unwrap();
    msg!("Program ID: {}", program_id);
    msg!("Accounts: {:?}", accounts);
    msg!("currently matching the following key {}", key);
    match key{
        0 => {
            msg!("Case: Zero");
            let value: u64 = rem
                .get(0..8)
                .and_then(|slice| slice.try_into().ok())
                .map(u64::from_le_bytes)
                .unwrap_or(0);
            msg!("values: {}", value);
        },
        1 => msg!("Case: One"),
        _ => msg!("Case: Default"),
    };
    Ok({})
}