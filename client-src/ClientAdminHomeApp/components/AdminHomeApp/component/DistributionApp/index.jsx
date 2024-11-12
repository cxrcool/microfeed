import React from 'react';
import {ADMIN_URLS, PUBLIC_URLS} from "../../../../../../common-src/StringUtils";
import {getPublicBaseUrl} from "../../../../../common/ClientUrlUtils";
import ExternalLink from "../../../../../components/ExternalLink";

const DISTRIBUTION_BUNDLE = [
  {
    label: 'rss',
    url: PUBLIC_URLS.rssFeed(getPublicBaseUrl()),
    summary: '将此 rss 链接提交到播客应用程序/网站。',
    details: (<div className="grid grid-cols-1 gap-4 py-2">
      <div>
        此 rss 源的架构遵循 Apple 播客 rss 规范。
      </div>
      <div>
        您可以在 <a href={ADMIN_URLS.settings()}>设置 / 订阅方法</a>中禁用 rss 源。
      </div>
    </div>),
  },
  {
    label: 'web',
    url: PUBLIC_URLS.webFeed(getPublicBaseUrl()),
    summary: '通过社交媒体/电子邮件将此网络链接分享给您的观众。',
    details: (<div className="grid grid-cols-1 gap-4 py-2">
      <div>
        您可以在<a href={ADMIN_URLS.settings()}>设置 / 自定义代码</a>中自定义样式并添加一些自定义代码。
      </div>
      <div>
        您可以在<a href={ADMIN_URLS.settings()}>设置 / 访问控制</a>中禁用整个网站。
      </div>
    </div>),
  },
  {
    label: 'json',
    url: PUBLIC_URLS.jsonFeed(getPublicBaseUrl()),
    summary: '编写代码来获取结构化数据并设置自动化。',
    details: (<div className="grid grid-cols-1 gap-4 py-2">
      <div>
        此 json 源的架构遵循 <a href="https://www.jsonfeed.org/">jsonfeed.org</a> 规范。
        请参阅microfeed的 JSON 源的 OpenAPI 规范：<a href="/json/openapi.yaml">YAML</a> 或 <a href="/json/openapi.html">HTML</a>。
      </div>
      <div>
        您可以在 <a href={ADMIN_URLS.settings()}>设置 / 订阅方法</a>中禁用 json 源。
      </div>
    </div>),
  },
];

export default class DistributionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (<div className="lh-page-card">
      <div className="lh-page-title">
        分配
      </div>
      <div className="grid grid-cols-1 gap-8 mt-8">
        {DISTRIBUTION_BUNDLE.map((bundle) => (<div
          key={`b-${bundle.label}`}
          className="grid grid-cols-12 gap-4"
        >
          <div className="col-span-2">
            <ExternalLink url={bundle.url} text={bundle.label} />
          </div>
          <div className="col-span-10">
            <div className="select-all bg-gray-200 py-2 px-4 rounded">
              {bundle.url}
            </div>
            <div className="mt-2 text-helper-color text-sm">
              <details>
                <summary className="hover:cursor-pointer hover:opacity-50">{bundle.summary}</summary>
                <div className="mt-4 bg-gray-100 px-2 py-1 rounded">
                  {bundle.details}
                </div>
              </details>
            </div>
          </div>
        </div>))}
      </div>
    </div>);
  }
}
