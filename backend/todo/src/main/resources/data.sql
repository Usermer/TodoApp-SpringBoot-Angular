insert into todos (id, title, completed) values (1, 'Buy groceries', false);
insert into todos (id, title, completed) values (2, 'Walk the dog', true);
insert into todos (id, title, completed) values (3, 'Read a book', false);
insert into todos (id, title, completed) values (4, 'Write code', true);
on conflict do nothing;