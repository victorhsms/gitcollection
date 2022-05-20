import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';


import { Header, RepoInfo } from './styles'; 
import logo from '../../assets/logo.svg';

type IRepoParams = {
  repository: string;
};
export const Repo: React.FC = () => {
  const { repository } = useParams<IRepoParams>();

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
    </>
  );
};