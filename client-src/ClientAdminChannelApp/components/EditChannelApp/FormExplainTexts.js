export const CHANNEL_CONTROLS = {
  TITLE: 'channel_title',
  IMAGE: 'channel_image',
  PUBLISHER: 'channel_publisher',
  WEBSITE: 'channel_website',
  CATEGORIES: 'channel_categories',
  LANGUAGE: 'channel_language',
  DESCRIPTION: 'channel_description',
  ITUNES_TYPE: 'channel_itunes_type',
  ITUNES_EMAIL: 'channel_itunes_email',
  COPYRIGHT: 'channel_copyright',
  ITUNES_TITLE: 'channel_itunes_title',
  ITUNES_EXPLICIT: 'channel_itunes_explicit',
  ITUNES_BLOCK: 'channel_itunes_block',
  ITUNES_NEW_RSS_URL: 'channel_itunes_new_rss_url',
  ITUNES_COMPLETE: 'channel_itunes_complete',
};

export const CONTROLS_TEXTS_DICT = {
  [CHANNEL_CONTROLS.TITLE]: {
    linkName: '标题',
    modalTitle: '频道 / 标题',
    text: "频道的名称。<br>" +
      "如果此频道是播客，那么它将是一个播客名称，例如，The Joe Rogan Experience、The Daily...<br>" +
      "如果这是一个博客，那么它就是博客网站的名称，例如 TechCrunch、Daring Fireball......",
    rss: '<channel><title>标题在这里</title></channel>',
    json: '{ "title": "标题在这里" }',
  },
  [CHANNEL_CONTROLS.IMAGE]: {
    linkName: '频道图像',
    modalTitle: '频道 / 图像',
    text: "频道的图像。<br>" +
      "如果是播客，则图像的最小大小必须为 1400 x 1400 像素，最大大小为 3000 x 3000 像素。" +
      "JPEG 或 PNG 格式，72 dpi，具有适当的文件扩展名（.jpg、.png），并且采用 RGB 色彩空间 -" +
      "这是 Apple Podcasts 的要求。",
    rss: '<channel><itunes:image href="https://cdn-site.com/img.jpg" /><image><url>https://cdn-site.com/img.jpg</url></image></channel>',
    json: '{ "icon": "https://cdn-site.com/img.jpg" }',
  },
  [CHANNEL_CONTROLS.PUBLISHER]: {
    linkName: '发布者',
    modalTitle: '频道 / 发布者',
    text: "频道的作者/发布者。 <br>" +
      "如果这个频道是一个播客，那么它就是出版商的名字，例如，Gimlet Media、New York Times、Joe Rogan......",
    rss: '<channel><itunes:author>在这里发布</itunes:author></channel>',
    json: '{ "authors": [{"name": "在这里发布"}] }',
  },
  [CHANNEL_CONTROLS.WEBSITE]: {
    linkName: '网站',
    modalTitle: '频道 / 网站',
    text: "频道的网站。默认情况下，它是此网站的 URL。" +
      "但您可以设置它以适应您的用例，例如，您大学网站上的主页。",
    rss: '<channel><link>网站在这里</link></channel>',
    json: '{ "home_page_url": "网站在这里" }',
  },
  [CHANNEL_CONTROLS.CATEGORIES]: {
    linkName: '类别',
    modalTitle: '频道 / 类别',
    text: "频道的类别。所有可用类别均来自 <a href='https://podcasters.apple.com/support/1691-apple-podcasts-categories'>Apple Podcasts</a>。<br>" +
      "如果这是一个播客，尽管您可以指定多个类别，但 Apple 播客只能识别第一个类别和子类别。",
    rss: '<channel><itunes:category text="Arts" /></channel>',
    json: '{ "_microfeed": {"categories": [{"name": "Arts"}]} }',
  },
  [CHANNEL_CONTROLS.LANGUAGE]: {
    linkName: '语言',
    modalTitle: '频道 / 语言',
    text: "频道的语言。<br>采用 RFC 5646 中指定的格式的 Feed 的主要语言。" +
      "该值通常是 ISO 639-1 中的 2 个字母的语言标记，后跟一个区域标记（可选）。 " +
      "（示例：en 或 en-US）。",
    rss: '<channel><language>en-us</language></channel>',
    json: '{ "language": "en-us" }',
  },
  [CHANNEL_CONTROLS.DESCRIPTION]: {
    linkName: '描述',
    modalTitle: '频道 / 描述',
    text: "频道的描述。<br>" +
      "如果此频道是播客，则描述允许的最大文本量为 4000 个字符 - 这是 Apple 播客的要求。<br>" +
      "如果这是一个博客，那么您可以写任意数量的单词作为描述。",
    rss: '<channel><description><![CDATA[ <p>这里有一些 HTML</p> ]]></description></channel>',
    json: '{ "description": "<p>这里有一些 HTML</p>" }',
  },
  [CHANNEL_CONTROLS.ITUNES_TYPE]: {
    linkName: '<itunes:type>',
    modalTitle: 'Channel / <itunes:type>',
    text: "The type of show.<br>" +
      "If your show is Serial you must use this tag.<br>" +
      "Its values can be one of the following:<br>" +
      "<b>Episodic</b> （默认）指定剧集（不按顺序使用剧集时）。Apple 播客将首先显示最新的单集，并显示每集的发布日期（必填）。如果按季节组织，则首先显示最新的季节 - 否则，将按发布的年份对剧集进行分组，最新的在前。<br>" +
      "对于新订阅者，Apple 播客会在其资料库中添加最新的单集。<br>" +
      "<b>Serial</b>. 指定 serial （按顺序使用剧集时）。Apple 播客将首先显示最早的单集，并显示每集的单集编号（必填）。如果按季节组织，将首先显示最新的季节，并且必须为每个集提供 itunes：episode 编号。",
    rss: '<channel><itunes:type>episodic</itunes:type></channel>',
    json: '{ "_microfeed": {"itunes:type": "episodic"} }',
  },
  [CHANNEL_CONTROLS.ITUNES_EMAIL]: {
    linkName: '<itunes:email>',
    modalTitle: 'Channel / <itunes:email>',
    text: "播客所有者的联系电子邮件。它将在 rss 源中公开。许多播客平台需要此电子邮件来验证您的播客所有权。",
    rss: '<channel><itunes:owner><itunes:email>myname@mycompany.com</itunes:email></itunes:owner></channel>',
    json: '{ "_microfeed": {"itunes:email": "myname@mycompany.com"} }',
  },
  [CHANNEL_CONTROLS.COPYRIGHT]: {
    linkName: '版权',
    modalTitle: '频道 / 版权',
    text: "显示版权详细信息。<br>" +
      "如果您的节目受版权保护，您应该使用此标签。例如：<br>" +
      "<em>版权所有 1995-2019 John John Appleseed</em>",
    rss: '<channel><copyright>©2023</copyright></channel>',
    json: '{ "_microfeed": {"itunes:type": "©2023"} }',
  },
  [CHANNEL_CONTROLS.ITUNES_TITLE]: {
    linkName: '<itunes:title>',
    modalTitle: 'Channel / <itunes:title>',
    text: "The show title specific for Apple Podcasts.<br>" +
      "itunes:title is a string containing a clear concise name of your show on Apple Podcasts.",
    rss: '<channel><itunes:title>a title here</itunes:title></channel>',
    json: '{ "_microfeed": {"itunes:title": "a title here"} }',
  },
  [CHANNEL_CONTROLS.ITUNES_EXPLICIT]: {
    linkName: '<itunes:explicit>',
    modalTitle: 'Channel / <itunes:explicit>',
    text: "The podcast parental advisory information.<br>" +
      "If you specify yes, indicating the presence of explicit content, Apple Podcasts displays an Explicit parental advisory graphic for your podcast.<br>" +
      "Podcasts containing explicit material aren’t available in some Apple Podcasts territories.<br>" +
      "If you specify no, indicating that your podcast doesn’t contain explicit language or adult content, Apple Podcasts displays a Clean parental advisory graphic for your podcast.",
    rss: '<channel><itunes:explicit>true</itunes:explicit></channel>',
    json: '{ "_microfeed": {"itunes:explicit": true} }',
  },
  [CHANNEL_CONTROLS.ITUNES_BLOCK]: {
    linkName: '<itunes:block>',
    modalTitle: 'Channel / <itunes:block>',
    text: "The podcast show or hide status in Apple Podcasts.<br>" +
      "If you want your show removed from the Apple directory, select 'yes'.<br>" +
      "Specifying the itunes:block tag with a 'yes' value, prevents the entire podcast from appearing in Apple Podcasts.<br>" +
      "Specifying any value other than 'yes' has no effect.",
    rss: '<channel><itunes:block>Yes</itunes:block></channel>',
    json: '{ "_microfeed": {"itunes:block": true} }',
  },
  [CHANNEL_CONTROLS.ITUNES_COMPLETE]: {
    linkName: '<itunes:complete>',
    modalTitle: 'Channel / <itunes:complete>',
    text: "The podcast update status.<br>" +
      "If you will never publish another episode to your show, select 'yes'.<br>" +
      "Specifying the itunes:complete tag with a 'yes' value indicates that a podcast is complete and you will not post any more episodes in the future.<br>" +
      "Specifying any value other than 'yes' has no effect.",
    rss: '<channel><itunes:complete>Yes</itunes:complete></channel>',
    json: '{ "_microfeed": {"itunes:complete": true} }',
  },
  [CHANNEL_CONTROLS.ITUNES_NEW_RSS_URL]: {
    linkName: '<itunes:new-rss-url>',
    modalTitle: 'Channel / <itunes:new-rss-url>',
    text: "The new podcast RSS Feed URL.<br>" +
      "If you change the URL of your podcast feed, you should use this tag in your new feed.<br>" +
      "Use the itunes:new-feed-url tag to manually change the URL where your podcast is located.<br>" +
      "You should maintain your old feed until you have migrated your existing subscribers. Learn how to update your podcast RSS feed URL.<br>" +
      "Note: The itunes:new-feed-url tag reports new feed URLs to Apple Podcasts and isn’t displayed in Apple Podcasts.",
    rss: '<channel><itunes:new-rss-url>https://a-new-rss-url.com/feed</itunes:new-rss-url></channel>',
    json: '{ "_microfeed": {"itunes:new-rss-url": "https://a-new-rss-url.com/feed"} }',
  },
};
