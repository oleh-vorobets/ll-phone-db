import { DataSource, DataSourceOptions } from 'typeorm';

const databaseConfiguration = () => {
    const ROOT_PATH = process.cwd();

    const entitiesPath = `${ROOT_PATH}/**/*.entity{.ts,.js}`;

    const config: DataSourceOptions = {
        type: 'sqlite',
        database: `${ROOT_PATH}/ll-phone.sqlite`,
        entities: [entitiesPath],
        logging: false,
        synchronize: true,
        dropSchema: false,
    };

    return config;
};

const AppDataSource = new DataSource(databaseConfiguration());

AppDataSource.initialize()
    .then(() => console.log('DataSource was successfully initialized!'))
    .catch((error) =>
        console.log('Error during DataSource initialization: ', error)
    );
