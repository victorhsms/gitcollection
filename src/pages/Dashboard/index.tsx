import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repos } from './styles'
import logo from '../../assets/logo.svg';

export const Dashboard: React.FunctionComponent = () => {
  return (
    <>
      <img src={ logo } alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form>
        <input placeholder='username/repository_name' />
        <button type='submit'>Buscar</button>
      </Form>

      <Repos>
        <a href='/repositories'>
          <img src='https://avatars.githubusercontent.com/u/80358579?v=4' alt='Repositorio' />
          <div>
            <strong>aluiziodeveloper/mini-curso-reactjs</strong>
            <p>
              Repositório do mini curso gratuito de reactjs
            </p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};