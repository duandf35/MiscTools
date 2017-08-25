#!/usr/bin/env python3


def __csv_to_sqlite(db_path, table_name, csv_file):
    import csv

    buff = []
    with open(csv_file, 'r') as f:
        for row in csv.reader(f):
            buff.append(row)

    __new_table(db_path, table_name, buff)


def __new_table(db_path, table_name, buff):
    import sqlite3

    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'")
    if cur.fetchone():
        print(f'Table {table_name} exists')
    else:
        header = buff[0]
        sample = buff[1]

        column_types = ''
        for pair in zip(header, sample):
            col_type = __detect_type(pair[1])
            if col_type == 'NULL':
                col_type = 'TEXT'
            column_types += f'{pair[0]} {col_type},'
        column_types = column_types[:-1]
        creation_sql = f'CREATE TABLE {table_name}({column_types})'

        print(creation_sql)

        conn.execute(creation_sql)
        conn.commit()

        column_values = ''
        values = ''
        for col in header:
            column_values += f'{col},'
            values += '?,'

        column_values = column_values[:-1]
        values = values[:-1]
        insertion_sql = f'INSERT INTO {table_name}({column_values}) VALUES({values})'

        print(insertion_sql)

        for row in buff[1:]:
            conn.execute(insertion_sql, [__parse(value.strip()) for value in row])
        conn.commit()

    conn.close()


def __detect_type(sample):
    import re

    if re.match('^(?!00)[-+]?\d+$', sample.strip()):
        return 'INTEGER'
    elif re.match('^(?!00)[-+]?\d+\.\d+$', sample.strip()):
        return 'REAL'
    elif not sample.strip():
        return 'NULL'
    else:
        return 'TEXT'


def __parse(raw_data):
    data_type = __detect_type(raw_data)

    if data_type == 'INTEGER':
        return int(raw_data)
    elif data_type == 'REAL':
        return float(raw_data)
    elif data_type == 'NULL':
        return None
    else:
        return raw_data

if __name__ == '__main__':
    from sys import argv, exit

    argv.pop(0)

    file = None
    table = None
    database = None

    while argv:
        opt = argv.pop(0)

        if opt == '-f':
            file = argv.pop(0)
        elif opt == '-t':
            table = argv.pop(0)
        elif opt == '-d':
            database = argv.pop(0)

    for k, v in {'file': file, 'table': table, 'database': database}.items():
        if not v:
            print(f'{k} is missing\n'
                  '-f | set the path to csv file\n'
                  '-t | set the table name\n'
                  '-d | set the path to database file\n')
            exit(1)

    __csv_to_sqlite(database, table, file)
