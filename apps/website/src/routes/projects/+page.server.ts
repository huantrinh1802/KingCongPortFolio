import { GITHUB_TOKEN } from '$env/static/private';
import type { PageServerData } from './$types';
import { request, gql } from 'graphql-request';
type Language = {
  name: string;
  color: string;
};
type Repository = {
  description: string;
  name: string;
  homepageUrl: string;
  primaryLanguage: Language;
  languages: { nodes: Language[] };
};
export const load = (async () => {
  const document = gql`
    query Repositories {
      viewer {
        repositories(first: 100, privacy: PUBLIC) {
          nodes {
            description
            name
            homepageUrl
            primaryLanguage {
              color
              name
            }
            languages(first: 100) {
              nodes {
                color
                name
              }
            }
          }
        }
      }
    }
  `;
  const repositories: { viewer: { repositories: { nodes: Repository[] } } } = await request(
    'https://api.github.com/graphql',
    document,
    null,
    { Authorization: `Bearer ${GITHUB_TOKEN}` }
  );
  return { repositories: repositories.viewer.repositories.nodes };
}) satisfies PageServerData;
