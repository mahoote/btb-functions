create policy "Enable insert for authenticated users only 167v1m2_0"
    on "storage"."objects"
    as permissive
    for insert
    to authenticated
    with check ((bucket_id = 'custom-rules-images'::text));


create policy "Enable select for all users 167v1m2_0"
    on "storage"."objects"
    as permissive
    for select
    to public
    using ((bucket_id = 'custom-rules-images'::text));