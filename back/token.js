import fs from 'fs';
import yaml from 'js-yaml';

try {
  const configFile = fs.readFileSync('config.yaml', 'utf8');
  const config = yaml.load(configFile);
  const accessToken = config.accessToken;
  console.log('Токен из файла config.yaml:', accessToken);
} catch (e) {
  console.log('Ошибка чтения файла config.yaml:', e);
}
