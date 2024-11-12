import React, {useState} from 'react';
import {ONBOARDING_TYPES, OUR_BRAND, SETTINGS_CATEGORIES} from "../../../../../../common-src/Constants";
import {CheckCircleIcon, ArrowRightCircleIcon} from "@heroicons/react/20/solid";
import AdminInput from "../../../../../components/AdminInput";
import Requests from "../../../../../common/requests";
import {ADMIN_URLS, isValidUrl} from "../../../../../../common-src/StringUtils";
import {showToast} from "../../../../../common/ToastUtils";

const SUBMIT_STATUS__START = 1;

function CheckListItem({title, onboardState, children}) {
  return (<div className="flex">
    <div className="mr-4">
      {onboardState.ready ? <CheckCircleIcon className="w-6 text-green-500" /> :
        <ArrowRightCircleIcon className="w-6 text-muted-color" />}
    </div>
    <details className="w-full" open={!onboardState.ready}>
      <summary className="cursor-pointer mb-4 font-semibold hover:opacity-50">
        {title} {onboardState.required && <span className="text-red-500">*</span>}
      </summary>
      <div className="mb-8">
        {children}
      </div>
    </details>
  </div>);
}

function SetupPublicBucketUrl({onboardState, webGlobalSettings, cloudflareUrls}) {
  const publicBucketUrl = webGlobalSettings.publicBucketUrl || '';
  const [url, setUrl] = useState(publicBucketUrl);
  const [submitStatus, setSubmitStatus] = useState(null);
  const submitting = submitStatus === SUBMIT_STATUS__START;
  return (<CheckListItem onboardState={onboardState} title="设置 R2 公有存储桶 URL">
    <div className="flex">
      <div className="mr-4 flex-1">
        <AdminInput
          type="url"
          placeholder="例如，https://cdn.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex-none">
        <button
          type="button"
          disabled={submitting}
          className="lh-btn lh-btn-brand-dark"
          onClick={(e) => {
            e.preventDefault();
            if (!isValidUrl(url)) {
              showToast('无效的 url。有效的 URL 应以 http:// 或 https:// 开头，' +
                '例如，https://media-cdn.microfeed.org',
                '错误', 5000);
              return;
            }
            setSubmitStatus(SUBMIT_STATUS__START);
            Requests.axiosPost(ADMIN_URLS.ajaxFeed(), {
              settings: {
                [SETTINGS_CATEGORIES.WEB_GLOBAL_SETTINGS]: {
                  ...webGlobalSettings,
                  publicBucketUrl: url,
                },
              }
            }).then(() => {
              showToast('更新！', '成功');
              setTimeout(() => {
                location.href = '';
              }, 1500);
            }).catch((error) => {
              setSubmitStatus(null);
              if (!error.response) {
                showToast('网络错误。请刷新页面并重试。', '错误');
              } else {
                showToast('失败。请重试。', '错误');
              }
            });
          }}
        >
          {submitting ? '更新...' : '更新'}
        </button>
      </div>
    </div>
    <div className="mt-4 rounded bg-gray-100 p-2 text-sm grid grid-cols-1 gap-2">
      <details>
        <summary className="cursor-pointer font-semibold hover:opacity-50">
          在哪里可以找到您的 R2 公有存储桶 URL？
        </summary>
        <div className="my-8 text-helper-color">
          <div>
            转到 <a href={cloudflareUrls.r2BucketSettingsUrl} target="_blank" rel="noopener noreferrer">
              Cloudflare 仪表板/R2 存储桶设置 <span className="lh-icon-arrow-right" /></a>
          </div>
          <div className="mt-4">
            <div>
              <span className="text-brand-light font-bold">[推荐]</span> 添加自定义域（例如 media-cdn.microfeed.org）。然后在此处复制此自定义域（例如，https://media-cdn.microfeed.org）。
            </div>
            <div className="mt-2">
              <img src="/assets/howto/get-r2-public-bucket-url-howto2.png" className="w-full" />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <span className="text-brand-light">[可以，但不推荐]</span> 如果您没有自定义域，也可以使用 Cloudflare 的 r2.dev 域 - 单击“允许访问”。然后在此处复制“公有存储桶 URL”（例如，https://pub-xxxx.r2.dev）。
            </div>
            <div className="mt-2">
              <img src="/assets/howto/get-r2-public-bucket-url-howto1.png" className="w-full" />
            </div>
          </div>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer font-semibold hover:opacity-50">
          R2 公共存储桶 url 有什么用？
        </summary>
        <div className="my-8 text-helper-color">
          <div>
            您将在 Cloudflare R2 上存储媒体文件（例如，音频、视频、图像、文档等）。为了向公众提供这些媒体文件，您必须提供 R2 公有存储桶 URL。
          </div>
          <div className="mt-2">
            假设 R2 公有存储桶 URL 为 https://cdn.example.com，则媒体文件（例如音频）将通过类似 https://cdn.example.com/some-audio.mp3 的链接访问
          </div>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer font-semibold hover:opacity-50">
          如何确保此 url 有效？
        </summary>
        <div className="my-8 text-helper-color">
          <div>
            当您打开此 R2 公有存储桶 URL 时，您将看到如下所示的 404 页面（例如，<a href={OUR_BRAND.exampleCdnUrl} target="_blank">https://media-cdn.microfeed.org</a>）：
          </div>
          <div className="mt-2">
            <img src="/assets/howto/get-r2-public-bucket-url-howto3.png" className="w-full" />
          </div>
        </div>
      </details>
    </div>
  </CheckListItem>);
}

function ProtectedAdminDashboard({onboardState, cloudflareUrls}) {
  return (<CheckListItem onboardState={onboardState} title="添加登录管理器 Admin Dashboard">
    <div className="mt-4 rounded bg-gray-100 p-2 text-sm grid grid-cols-1 gap-2 text-helper-color">
      <div className="mb-2">
        您将使用 <a href="https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/" target="_blank">
        Cloudflare Zero Trust </a>添加登录信息，因此只有授权用户才能访问此管理仪表板。
      </div>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">
          第 1 步：添加访问权限群组
        </summary>
        <div className="mt-4">
          转到 <a href={cloudflareUrls.addAccessGroupUrl} target="_blank">Cloudflare 仪表板 / 添加访问组<span className="lh-icon-arrow-right"/></a>
        </div>
        <div className="my-4">
          如果这是您第一次使用 Cloudflare Zero Trust，您可能需要先注册 Free 计划。
        </div>
        <div className="mt-4">
          您需要指定允许哪些电子邮件访问此管理仪表板：
        </div>
        <div className="mt-2">
          <img src="/assets/howto/add-access-group.png" className="w-full border"/>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">
          第 2 步：创建自托管应用程序以保护 <b>{cloudflareUrls.pagesDevUrl}/admin</b>
        </summary>
        <div className="mt-4">
          转到 <a href={cloudflareUrls.addAppUrl} target="_blank">
          Cloudflare Dashboard / 创建自托管应用程序 <span className="lh-icon-arrow-right"/>
        </a>
        </div>
        <div className="mt-4">
          在此处选择 “Self-hosted”：
        </div>
        <div className="mt-2">
          <img src="/assets/howto/select-self-hosted-app.png" className="w-full border"/>
        </div>
        <div className="mt-4">
          填写 <b>{cloudflareUrls.pagesDevUrl}/admin</b> 的信息：
        </div>
        <div className="mt-2 text-red-500">
          {'注意：请按顺序按照编号箭头操作。否则，可能无法编辑 “Path”。 ' +
           '如果您看到 “the zone does not exist” 消息，请忽略它并继续 下一步. ' +
           '我们希望 Cloudflare 能够改进他们的 UI，让事情变得不那么混乱:)'}
        </div>
        <div className="mt-2">
          <img src="/assets/howto/add-app1.png" className="w-full border"/>
        </div>
        <div className="mt-4">
          添加策略名称，然后一直单击“下一步”，直到添加应用程序：
        </div>
        <div className="my-4">
          <img src="/assets/howto/add-app2.png" className="w-full border"/>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">
          第 3 步：检查它是否有效
        </summary>
        <div className="mt-4">
          刷新当前页面，您应该能够使用您的电子邮件登录。
        </div>
        <div className="my-4">
          <img src="/assets/howto/app-access-login.png" className="w-full border"/>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">

          奖励：为 <b>*.{cloudflareUrls.pagesDevUrl}</b> 创建自托管应用程序
        </summary>
        <div className="mt-4">
        您可能希望为 <b>*.{cloudflareUrls.pagesDevUrl}</b> 创建第二个自托管应用程序，这将保护所有<a href="https://developers.cloudflare.com/pages/platform/preview-deployments/" target="_blank">预览部署</a>。
        </div>
        <div className="mt-4">
          转到 <a href={cloudflareUrls.addAppUrl} target="_blank">
          Cloudflare Dashboard / 创建自托管应用程序<span className="lh-icon-arrow-right"/>
        </a>
        </div>
        <div className="my-4">
          在 Subdomain 中加上星号 （*）：
        </div>
        <div className="my-4">
          <img src="/assets/howto/protect-preview.png" className="w-full border"/>
        </div>
      </details>
    </div>
  </CheckListItem>);
}

function CustomDomain({onboardState, cloudflareUrls}) {
  return (<CheckListItem onboardState={onboardState} title="Use Custom Domain">
    <div className="mt-4 rounded bg-gray-100 p-2 text-sm grid grid-cols-1 gap-2 text-helper-color">
      <div className="mb-2">
        使用自定义域，您可以从 Cloudflare 功能中受益，例如机器人管理、Access 和 Cache。
      </div>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">
          第 1 步：为此站点设置自定义域
        </summary>
        <div className="mt-4">
          转到 <a href={cloudflareUrls.pagesCustomDomainUrl} target="_blank">Cloudflare 仪表板/Pages 设置<span className="lh-icon-arrow-right"/></a>
        </div>
        <div className="my-4">
          <img src="/assets/howto/pages-custom-domain.png" className="w-full border"/>
        </div>
      </details>
      <details>
        <summary className="cursor-pointer hover:opacity-50 text-black font-semibold">
          第 2 步：创建自托管应用程序以保护管理员控制面板
        </summary>
        <div className="mt-4">
          如果要从新添加的自定义域访问此管理仪表板，则必须为管理员 URL 创建自托管应用程序。这次不要使用 {cloudflareUrls.pagesDevUrl}，而是使用新的自定义域。
        </div>
        <div className="mt-4">
          转到 <a href={cloudflareUrls.addAppUrl} target="_blank">
            Cloudflare 仪表板 / 添加应用程序 <span className="lh-icon-arrow-right"/>
          </a>
        </div>
        <div className="my-4">
          <img src="/assets/howto/add-app3.png" className="w-full border"/>
        </div>
      </details>
    </div>
  </CheckListItem>);
}

export default class SetupChecklistApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {feed, onboardingResult} = this.props;
    const {settings} = feed;
    const webGlobalSettings = settings[SETTINGS_CATEGORIES.WEB_GLOBAL_SETTINGS] || {};

    return (<div className="lh-page-card">
      <div className="lh-page-title">
        设置清单
      </div>
      {onboardingResult.allOk && <div className="text-helper-color border border-green-700 bg-green-100 text-green-700 rounded p-2">
        <i>你都准备好了！</i>
        <div className="mt-2">
          在 <a href={ADMIN_URLS.newItem()}>添加新项目<span className="lh-icon-arrow-right" /></a> 开始发布
        </div>
      </div>}
      <div className="mt-8">
        <SetupPublicBucketUrl
          onboardState={onboardingResult.result[ONBOARDING_TYPES.VALID_PUBLIC_BUCKET_URL]}
          webGlobalSettings={webGlobalSettings}
          cloudflareUrls={onboardingResult.cloudflareUrls}
        />
        <ProtectedAdminDashboard
          onboardState={onboardingResult.result[ONBOARDING_TYPES.PROTECTED_ADMIN_DASHBOARD]}
          cloudflareUrls={onboardingResult.cloudflareUrls}
        />
        <CustomDomain
          onboardState={onboardingResult.result[ONBOARDING_TYPES.CUSTOM_DOMAIN]}
          cloudflareUrls={onboardingResult.cloudflareUrls}
        />
      </div>
      <div className="text-right mt-4 text-sm text-helper-color">
        <span className="text-red-500">*</span> 必填
      </div>
    </div>);
  }
}
