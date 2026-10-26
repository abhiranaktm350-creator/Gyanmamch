

-- Owner-only initial administrator bootstrap. Keep this function unavailable to browser roles.
create or replace function public.claim_initial_admin(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  perform pg_advisory_xact_lock(hashtext('gyan_manch_initial_admin'));

  if exists (select 1 from public.profiles where role = 'admin') then
    raise exception 'An administrator already exists. Initial admin claim is closed.';
  end if;

  update public.profiles
  set role = 'admin', approval_status = 'approved', updated_at = now()
  where id = p_user_id;

  if not found then
    raise exception 'No profile exists for this user. Register and verify the account first.';
  end if;
end;
$$;
revoke all on function public.claim_initial_admin(uuid) from public, anon, authenticated, service_role;
