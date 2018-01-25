import { SearchkitManager } from 'searchkit';

const host = "https://d695e02a11cb3743d675f08895639dae.us-east-1.aws.found.io:9243/episodes";
const searchkit = new SearchkitManager(host, {
  basicAuth: 'search_ui_readonly:publiclyaccessible'
});

export default searchkit;
