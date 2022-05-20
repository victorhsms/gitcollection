import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { api } from '../../services/api';
import { Header, RepoInfo, Issues } from './styles'; 
import logo from '../../assets/logo.svg';

type IRepoParams = {
  repository: string;
};

interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

export const Repo: React.FC = () => {
  const [repo, setRepo] = useState<GithubRepository | null>(null);
  const [issues, setIssues] = useState<GithubIssue[]>([]);
  const { repository } = useParams<IRepoParams>();

  useEffect(() => {
    api
      .get(`repos/${ repository && repository.replace("%2F","/")}`)
      .then(response => setRepo(response.data));

    api
      .get(`repos/${repository}/issues`)
      .then(response => setIssues(response.data));
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

      { repo && (
      <RepoInfo>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <div>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repo.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repo.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repo.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepoInfo>
      )}
      
      <Issues>
        { issues.map(issue => (
          <a href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};