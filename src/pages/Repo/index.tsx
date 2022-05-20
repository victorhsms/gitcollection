import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import { Header, RepoInfo, Issues } from './styles'; 
import logo from '../../assets/logo.svg';

type IRepoParams = {
  repository: string;
};
export const Repo: React.FC = () => {
  const { repository } = useParams<IRepoParams>();

  useEffect(() => {
    api
      .get(`repos/${repository}`)
      .then(response => console.log(response.data));

    api
      .get(`repos/${repository}/issues`)
      .then(response => console.log(response.data));
  }, [repository])

  return (
    <>
      <Header>
        <img src={ logo } alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      <RepoInfo>
        <header>
          <img src="" alt="" />
          <div>
            <strong></strong>
            <p></p>
          </div>
        </header>
        <ul>
          <li>
            <strong></strong>
            <span></span>
          </li>
          <li>
            <strong></strong>
            <span></span>
          </li>
          <li>
            <strong></strong>
            <span></span>
          </li>
        </ul>
      </RepoInfo>
      <Issues>
        <Link to="/">
          <div>
            <strong></strong>
            <p></p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};