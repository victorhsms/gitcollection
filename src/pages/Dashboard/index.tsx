import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import { Title, Form, Repos, Error } from './styles';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
export const Dashboard: React.FunctionComponent = () => {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    return storageRepos ? JSON.parse(storageRepos) : [];
  });
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    const repository = response.data;

    setRepos([...repos, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={ logo } alt="GitCollection" />
      <Title>Catálogo de repositórios do Github</Title>
      <Form hasError={Boolean(inputError)} onSubmit={ handleAddRepo }>
        <input
          placeholder='username/repository_name'
          onChange={ handleInputChange }
          value={ newRepo }
        />
        <button type='submit'>Buscar</button>
      </Form>

      { inputError && <Error>{ inputError }</Error>}

      <Repos>
        { repos.map(repository => (
          <React.Fragment key={repository.full_name}>
            <Link to={`/repositores/${encodeURIComponent(repository.full_name)}`} >
              <img
                src={ repository.owner.avatar_url }
                alt={ repository.owner.login }
              />
              <div>
                <strong>{ repository.full_name }</strong>
                <p>
                  { repository.description }
                </p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </React.Fragment>
        ))}
      </Repos>
    </>
  );
};