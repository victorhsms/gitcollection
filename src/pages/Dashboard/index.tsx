import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import { Title, Form, Repos } from './styles';
import logo from '../../assets/logo.svg';

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
export const Dashboard: React.FunctionComponent = () => {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepos([...repos, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={ logo } alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form onSubmit={ handleAddRepo }>
        <input
          placeholder='username/repository_name'
          onChange={ handleInputChange }
          value={ newRepo }
        />
        <button type='submit'>Buscar</button>
      </Form>

      <Repos>
        { repos.map(respository => (
          <a href='/repositories' key={respository.full_name}>
            <img
              src={ respository.owner.avatar_url }
              alt={ respository.owner.login }
            />
            <div>
              <strong>{ respository.full_name }</strong>
              <p>
                { respository.description }
              </p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};