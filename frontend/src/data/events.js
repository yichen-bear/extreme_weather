export const allEvents = [
  // ==================洪水洪水洪水洪水洪水===================
  {
    id: '2017-bangladesh',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '2017孟加拉山洪 (2017 Bangladesh Floods and Landslides)',
    location: '南亞 孟加拉',
    date: '2017/Jun',
    pages: [
      { 
        subtitle: '圖: 孟加拉吉大港街景\n7月正值南亞地區雨季，雨季時，印度季風都會造成南亞三國 (尼泊爾、印度、孟加拉) 嚴重災害和傷亡', 
        content: '受印度季風 + 孟加拉灣熱帶低壓雙重天氣系統發威，2017年孟加拉雨季災情是40年來最嚴重的一次，許多人在家中睡覺時遭土石流掩埋。\n\n▌孟國因人口過剩，土地不敷使用而過度砍伐林地，森林覆蓋率為全世界最低，因而容易發生嚴重的土石崩塌事件', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Street_Scene_-_Chittagong_-_Bangladesh_-_02_%2813080962564%29.jpg/1920px-Street_Scene_-_Chittagong_-_Bangladesh_-_02_%2813080962564%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20171119193752',
        detailImgTitle: '🗺️孟加拉各行政分區',
        detailImg: '/images/2017-bangladeshFlood.jpg',
        impact: [
          { label: '🪦死亡', value: '160人' },
          { label: '🌊首都達卡', value: '嚴重淹水' },
          { label: '🚨第二城市吉大港', value: '土石流' },
        ],
        sources: [
          { name: '"Street Scene-Chittagong-Bangladesh-02"by Adam Jones, Ph.D., CC BY-SA 2.0, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Street_Scene_-_Chittagong_-_Bangladesh_-_02_(13080962564).jpg' },
          { name:'國家災害防救科技中心-2017 孟加拉山洪暴發(6月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/9407/9646/'}
        ]
      }
    ]
  },
  {
    id: '2020-SouthAsian',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '2020南亞季風洪水 (2020 South Asian floods)',
    location: '南亞 尼泊爾、印度、孟加拉',
    date: '2020/Jul',
    pages: [
      { 
        subtitle: '暴雨淹沒了印度卡齊蘭加國家公園90%面積，水鹿正在尋找舒適的棲身之所\n水鹿自2008年以來被列入世界自然保護聯盟 (IUCN) 紅色名錄的易危物種', 
        content: '受強烈西南季風影響，印度、尼泊爾與孟加拉持續降雨，引發大規模洪水與山崩。\nCOVID-19 大流行的當下，還需要注意減少人群感染風險，對災難響救援工作又是進一步挑戰。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sambar_Deer_during_Flood_at_Kaziranga_National_Park%2C_North_East_India.jpg/1920px-Sambar_Deer_during_Flood_at_Kaziranga_National_Park%2C_North_East_India.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20200722025143',
        impact: [
          { label: '🪦死亡', value: '936人↑' },
          { label: '😷新冠肺炎', value: '確診病例攀升↑' },
          { label: '🏞️卡齊蘭加國家公園', value: '野生動物受困洪水' },
        ],
        sources: [
          { name: '"Sambar Deer during Flood at Kaziranga National Park, North East India"by Dhrubazaanphotography, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Sambar_Deer_during_Flood_at_Kaziranga_National_Park,_North_East_India.jpg' },
          { name:'Monsoon floods, landslides ravage South Asia, at least 221 dead', url:'https://www.aljazeera.com/news/2020/7/17/monsoon-floods-landslides-ravage-south-asia-at-least-221-dead'},
          { name:'Millions of children affected by devastating flooding in South Asia, with many more at risk as COVID-19 brings further challenges', url:'https://www.unicef.org/press-releases/millions-children-affected-devastating-flooding-south-asia-many-more-risk-covid-19'},
          { name:'國家災害防救科技中心-2020 季風雨嚴重影響印度、尼泊爾及孟加拉等地 (7月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/1384/11003/'}
        ]
      }
    ]
  },
  {
    id: 'rohingya-2021',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '羅興亞難民營洪災 (Rohingya Camp Floods)',
    location: '南亞 孟加拉',
    date: '2021/July',
    pages: [
      { 
        subtitle: '#難民居住環境惡化 #Covid19', 
        content: '連續 3 天季風降雨與強風襲擊孟國科克斯巴扎爾地區，造成山洪和土石流。\n由於難民營的屋子相當簡陋，無法阻擋洪水，山泥傾瀉壓毀了簡陋棚屋，並活埋多名難民。又因 Covid-19 病例增加，營區遭到封鎖，從而限制救援工作，使難民營的情況更加嚴峻。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rohingya_Refugee_Camp_26.jpg/1920px-Rohingya_Refugee_Camp_26.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20200925062251',
        impact: [
          { label: '🪦死亡', value: '20人↑' },
          { label: '🚨受困洪水', value: '30萬6000人' },
          { label: '🛖村莊泡水', value: '70座↑' }
        ],
        sources: [
          { name: '© Masum-al-hasan Rocky / Wikimedia Commons / "Rohingya Refugee Camp 26" / CC-BY-SA-4.0', url: 'https://commons.wikimedia.org/wiki/File:Rohingya_Refugee_Camp_26.jpg' },
          { name:'中央社-孟加拉洪水肆虐逾30萬人受困 至少20人喪生', url:'https://www.cna.com.tw/news/firstnews/202107300359.aspx'},
          { name:'國家災害防救科技中心-2021 孟加拉羅興亞難民營區山洪暴發(7月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/11358/11689/'}
        ]
      }
    ]
  },
  {
    id: 'india-bangladesh-flood-2022',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '2022印度和孟加拉洪水 (2022 India-Bangladesh floods)',
    location: '南亞 印度阿薩姆邦、孟加拉',
    date: '2022/May~Jun',
    pages: [
      { 
        subtitle: '#長時間異常降雨 #6月雨季提前\nImran Ahmad 在孟加拉錫爾赫特 (Sylhet) 向災民分發救濟物資', 
        content: '印度阿薩姆邦與下游的孟加拉發生持續近 2 週的強降雨，累積雨量超過 1,500 mm，接近全年降雨量，導致河川水位暴漲與大規模洪水。\n1,900 座村莊被淹沒，交通與農業受重創。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Imran_Ahmad_distributing_relief_supplies_in_Sylhet_for_flood_victims_2022-05-21_%28PID-0023082%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20251016232828',
        impact: [
          { label: '🪦死亡', value: '72人↑' },
          { label: '👤受災人數', value: '265萬人' },
          { label: '🚨衛生', value: '不安全的飲用水' }
        ],
        sources: [
          { name: '"Imran Ahmad distributing relief supplies in Sylhet for flood victims 2022-05-21 (PID-0023082)"from PID, Government of Bangladesh, Public Domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Imran_Ahmad_distributing_relief_supplies_in_Sylhet_for_flood_victims_2022-05-21_(PID-0023082).jpg' },
          { name:'CNN-Millions affected after deadly floods hit India and Bangladesh', url:'https://edition.cnn.com/2022/06/22/india/bangladesh-india-floods-death-toll-intl-hnk'},
          { name:'國家災害防救科技中心-2022年印度阿薩姆邦與孟加拉洪災事件紀錄(5月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/12053/12636/'}
        ]
      }
    ]
  },
  {
    id: 'kashmir-2024',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '印度克什米爾洪災 (Kashmir Floods)',
    location: '南亞 Jammu and Kashmir, India',
    date: '2024/Apr',
    pages: [
      { 
        subtitle: '查謨-斯利那加國家高速公路 (Jammu-Srinagar National Highway) 是喀什米爾山谷通往印度其他地區的生命線，常因山崩落石在雨季和雪季中斷', 
        content: '這次印度北部查謨與克什米爾地區持續遭遇暴雨，使查謨-斯利那加國家高速公路封閉了三天，數百輛汽車被迫滯留公路沿線。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Jammu_Srinagar_Highway.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20160219110416',
        impact: [
          { label: '🪦死亡', value: '5人' },
          { label: '⚠️當地對外交通', value: '主要幹道封閉' },
          { label: '⛰️山體滑坡', value: '路面開裂與下沉' }
        ],
        sources: [
          { name: '"Jammu Srinagar Highway"by Akaravadra, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Jammu_Srinagar_Highway.jpg' },
          { name: '5 Killed, Several Injured In Landslides, Flash Floods In Jammu And Kashmir', url: 'https://www.ndtv.com/india-news/5-killed-several-injured-in-landslides-flash-floods-in-j-ks-kupwara-5555438' },
          { name:`Landslide damages roads and houses in Jammu and Kashmir's Ramban`, url:'https://timesofindia.indiatimes.com/city/jammu/landslide-damages-roads-and-houses-in-jammu-and-kashmirs-ramban/articleshow/109646384.cms'},
          { name:'國家災害防救科技中心-2024 大雨侵襲印度北部地區(4月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13313/'}
        ]
      }
    ]
  },
  {
    id: 'delhi-2024',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '2024 印度德里洪災 (Delhi Flood 2024)',
    location: '南亞 Delhi-NCR, India',
    date: '2024/Jun',
    pages: [
      { 
        subtitle: '圖: 德里機場1D航廈\n德里機場是印度最繁忙的機場之一，在暴雨和狂風的襲擊下，第一航站樓頂棚坍塌，造成1死8傷', 
        content: '西南季風與低壓系統使暖濕氣流匯聚，引發強烈雷暴豪雨，嚴重影響印度大德里都會區。德里 6/28 單日降雨量達 228.1 mm，是當地自 1936 年以來次高的單日降雨量。', 
        img: '/images/dehliAirport_terminal1D.jpg',
        impact: [
          { label: '🪦死亡', value: '11人↑' },
          { label: '🛫班機取消❌', value: '10班' },
          { label: '🛬班機延誤🚨', value: '40班' }
        ],
        twitterEmbed: `<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Delhi Airport T1 roof collapse: One killed, six others injured in the incident. Union Civil Aviation Minister has announced Rs 20 lakh compensation for the victim&#39;s kin. Delhi government has called an emergency meeting to review the flood situation in the national capital.… <a href="https://t.co/jg1SCMiJw4">pic.twitter.com/jg1SCMiJw4</a></p>&mdash; The New Indian Express (@NewIndianXpress) <a href="https://twitter.com/NewIndianXpress/status/1806601020442636698?ref_src=twsrc%5Etfw">June 28, 2024</a></blockquote>`,
        sources: [
          { name: '"Delhi Airport Terminal 1D"by IncMan, CC BY-SA 2.0', url: 'https://www.flickr.com/photos/51937732@N00/4305641261' },
          { name: 'The embedded tweet is from New Indian Express', url: 'https://twitter.com/NewIndianXpress/status/1806601020442636698' },
          { name:'印度德里機場頂棚坍塌 1死8傷 航班取消', url:'https://www.epochtimes.com/b5/24/6/28/n14279260.htm'},
          { name:'國家災害防救科技中心-2024 6月印度德里洪災事件', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13389/'}
        ]
      }
    ]
  },
  {
    id: 'dongting-flood-2024',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '洞庭湖潰堤事件 (Dongting Lake Levee Breach)',
    location: '中國 湖南省',
    date: '2024/Jul',
    pages: [
      { 
        subtitle: '#潰堤型洪水', 
        content: '7/5 湖南省華容縣堤防因管湧導致潰堤，湖水迅速灌入以低堤防「與湖爭田」的耕種區「垸田」內，淹沒農田、村莊與基礎設施。中國政府動員數千名救援人員與大量機具，封堵決口，成為 2024 年中國最受矚目的洪災事件之一。\n\n▌管湧 (piping)：水位過高時，水從堤防內滲出並帶走土砂，形成像管子一樣的水流，可能破壞堤防，嚴重則潰堤。', 
        img: '/images/donting-lake.jpg',
        impact: [
          { label: '🏃‍♂️緊急撤離', value: '7680人' },
          { label: '🌊決堤口 : 226m', value: '平放 0.5 棟台北101' },
          { label: '淹水面積 : 47.64km²', value: '大安森林公園 x180' }
        ],
        sources: [
          { name: '「巴陵广场拍摄洞庭湖」(由 中文維基百科的蓝芷怡 拍攝), CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:%E5%B7%B4%E9%99%B5%E5%B9%BF%E5%9C%BA%E6%8B%8D%E6%91%84%E6%B4%9E%E5%BA%AD%E6%B9%96.jpg' },
          { name: '「封堵」洞庭湖決堤 中國湖南豪雨成災⋯又傳多處「管湧」', url:'https://tw.news.yahoo.com/%E5%B0%81%E5%A0%B5-%E6%B4%9E%E5%BA%AD%E6%B9%96%E6%B1%BA%E5%A0%A4-%E4%B8%AD%E5%9C%8B%E6%B9%96%E5%8D%97%E8%B1%AA%E9%9B%A8%E6%88%90%E7%81%BD-%E5%8F%88%E5%82%B3%E5%A4%9A%E8%99%95-%E7%AE%A1%E6%B9%A7-025105987.html?guccounter=1'},
          { name:'國家災害防救科技中心-2024 中國湖南省洞庭湖潰堤事件(7月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13395/'}
        ]
      }
    ]
  },
  {
    id: 'shaanxi-flood-2024',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '2024陝西洪災 (Shaanxi Floods)',
    location: '中國 陝西省',
    date: '2024/Aug',
    pages: [
      { 
        subtitle: '陝西省北洛河未淹水時原貌 #河川洪水', 
        content: '陝西省受連日局部大暴雨影響，流過境內的北洛河發生1994年以來最大洪水，河川水位迅速上升並超過警戒線，洪峰沿下游推進，對沿岸地區造成威脅。 \n\n▌洪峰 : 河流在漲水期間達到的最大流量。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/%E7%94%98%E6%B3%89_%E4%BA%8E%E7%94%98%E9%92%9F%E9%93%81%E8%B7%AF%E4%B8%8A%E9%81%A5%E6%9C%9B%E5%8C%85%E8%A5%BF%E9%93%81%E8%B7%AF%E4%B8%8E%E8%A5%BF%E5%BB%B6%E9%AB%98%E9%93%81%E5%8C%97%E6%B4%9B%E6%B2%B3%E6%A1%A5_02.jpg/1920px-%E7%94%98%E6%B3%89_%E4%BA%8E%E7%94%98%E9%92%9F%E9%93%81%E8%B7%AF%E4%B8%8A%E9%81%A5%E6%9C%9B%E5%8C%85%E8%A5%BF%E9%93%81%E8%B7%AF%E4%B8%8E%E8%A5%BF%E5%BB%B6%E9%AB%98%E9%93%81%E5%8C%97%E6%B4%9B%E6%B2%B3%E6%A1%A5_02.jpg?_=20260305065958',
        impact: [
          { label: '🏃‍♂️緊急撤離', value: '18745人' },
          { label: '🌊河川水位', value: '達歷史高位' },
        ],
        sources: [
          { name: '“甘泉 于甘钟铁路上遥望包西铁路与西延高铁北洛河桥 02”by Liuxingy, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:%E7%94%98%E6%B3%89_%E4%BA%8E%E7%94%98%E9%92%9F%E9%93%81%E8%B7%AF%E4%B8%8A%E9%81%A5%E6%9C%9B%E5%8C%85%E8%A5%BF%E9%93%81%E8%B7%AF%E4%B8%8E%E8%A5%BF%E5%BB%B6%E9%AB%98%E9%93%81%E5%8C%97%E6%B4%9B%E6%B2%B3%E6%A1%A5_02.jpg'},
          { name: '陝西北洛河出現30年來最大洪水 近2萬人撤離', url:'https://www.cna.com.tw/news/acn/202408110138.aspx'},
          { name:'國家災害防救科技中心-2024 中國陝西洪災(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13431/'}
        ]
      }
    ]
  },
  {
    id: 'bangladesh-2024',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '孟加拉洪災 (Bangladesh Floods)',
    location: '南亞 孟加拉東部',
    date: '2024/Aug',
    pages: [
      { 
        subtitle: '災民比甘：「我們無法從家裡帶走任何東西。昨天晚上11點開始淹水時，我們在睡覺，早上走出家門時，路邊的水幾乎淹到我們的脖子。」', 
        content: '孟加拉每逢雨季便豪雨成災，情況一年比一年嚴重。這次東部因連續季風降雨，導致河川水位暴漲，引發洪水。除了淹沒孟加拉東部的村莊農田，大水也切斷了道路交通，讓救援與物資輸入格外困難。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/2024_floods_in_Bahaddarhat%2C_Chittagong_04.jpg/1920px-2024_floods_in_Bahaddarhat%2C_Chittagong_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240827155630',
        impact: [
          { label: '🪦死亡', value: '20人↑' },
          { label: '🆘受災人數', value: '520萬↑' },
          { label: '💸經濟影響', value: '商業活動受擾' }
        ],
        sources: [
          { name: '"2024 floods in Bahaddarhat, Chittagong 04"by Owais Al Qarni, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:2024_floods_in_Bahaddarhat,_Chittagong_04.jpg' },
          { name:'公視-孟加拉暴雨釀洪災至少20死 超過520萬人受影響成災民', url:'https://news.pts.org.tw/article/711744'},
          { name:'國家災害防救科技中心-2024 孟加拉國東部洪災(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13445/'}
        ]
      }
    ]
  },
  {
    id: 'rongjiang-flood',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '貴州榕江洪災 (Rongjiang Floods)',
    location: '中國 貴州省榕江縣',
    date: '2025/Jun',
    pages: [
      { 
        subtitle: '2025年6月下旬，榕江縣遭遇特大洪水侵襲，「村超」球場被渾濁的洪流吞沒。\n#上游與本地皆降雨造成極端雨量', 
        content: '這是當地 70 年來最嚴重的水災，僅 3 天，貴州榕江縣雨量便相當下了「46個西湖」，一週一共下了半年雨量。\n連續數天大暴雨，加上榕江縣城是一個有三條江匯集的盆地，僅有一條 ”都柳江” 排洪，上游洩洪太快，下游都柳江來不及排出大量江水，導致倒灌，整座城市汪洋一片，建物嚴重損毀。 ', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/%E8%B4%B5%E5%B7%9E%E2%80%9C%E6%9D%91%E8%B6%85%E2%80%9D%E7%81%BE%E5%90%8E%E9%87%8D%E5%90%AF_%E7%BB%BF%E8%8C%B5%E5%9C%BA%E5%86%8D%E7%87%83%E8%B6%B3%E7%90%83%E7%83%AD%E7%88%B1-2.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20250730133537',
        impact: [
          { label: '🪦死亡', value: '6人' },
          { label: '🆘受災人口', value: '10萬人↑' },
          { label: '🌊受淹範圍', value: '榕江縣 80% 區域' },
        ],
        sources: [
          { name: '「贵州“村超”灾后重启 绿茵场再燃足球热爱-2」(由 中國新聞社 製作), CC BY 3.0, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:%E8%B4%B5%E5%B7%9E%E2%80%9C%E6%9D%91%E8%B6%85%E2%80%9D%E7%81%BE%E5%90%8E%E9%87%8D%E5%90%AF_%E7%BB%BF%E8%8C%B5%E5%9C%BA%E5%86%8D%E7%87%83%E8%B6%B3%E7%90%83%E7%83%AD%E7%88%B1-2.png'},
          { name: '一週下半年雨量！榕江三天「降46個西湖」 全市泡在泥水中', url:'https://www.ettoday.net/news/20250630/2987348.htm'},
          { name:'國家災害防救科技中心-2025 中國貴州省榕江縣洪災報導', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26596/'}
        ]
      }
    ]
  },
  {
    id: 'yunnan-flood-2025',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '2025雲南洪災 (2025 Yunnan Floods)',
    location: '中國 雲南省',
    date: '2025/Jul',
    pages: [
      { 
        subtitle: '雲南的白水川是昭通市的主要四河川之一。 #強降雨', 
        content: '受強降雨雲團影響，雲南昭通市遭遇大範圍暴雨、局部特大暴雨襲擊。\n昭通市當地多處洪水和崩塌，一共 4 條河川超過警戒水位、3 條超過保證水位。 ', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/River_Baishui.jpg/1920px-River_Baishui.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20100721011406',
        impact: [
          { label: '🪦死亡', value: '5人' },
          { label: '🆘緊急轉移安置', value: '7000人↑' },
          { label: '🐷家畜死亡', value: '500隻↑' },
        ],
        sources: [
          { name: '“River Baishui”by Patcre, CC BY-SA 3.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:River_Baishui.jpg'},
          { name: '雲南昭通遭遇特大暴雨緊急轉移7000餘名民眾', url:'https://news.mingpao.com/ins/%E5%85%A9%E5%B2%B8/article/20250709/s00004/1752053330235/%E9%9B%B2%E5%8D%97%E6%98%AD%E9%80%9A%E9%81%AD%E9%81%87%E7%89%B9%E5%A4%A7%E6%9A%B4%E9%9B%A8-%E7%B7%8A%E6%80%A5%E8%BD%89%E7%A7%BB7000%E9%A4%98%E5%90%8D%E6%B0%91%E7%9C%BE'},
          { name:'國家災害防救科技中心-2025 中國雲南豪雨成災(7月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26628/'}
        ]
      }
    ]
  },
  {
    id: 'gansu-flood-2025',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '2025甘肅洪災 (2025 Gansu Floods)',
    location: '中國 甘肅省蘭州市',
    date: '2025/Aug',
    pages: [
      { 
        subtitle: '圖: 蘭州水上清真寺。\n蘭州是全中國唯一一座黃河穿城而過的城市。#河川洪水', 
        content: '甘肅省蘭州市出現罕見強降雨，短時間內累積雨量接近全年平均的一半。\n突發性洪水迅速沖入山區村落，造成房屋、道路與基礎設施嚴重損毀。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Lanzhou-rio-amarillo-baita-shan-d02.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20051217180351',
        impact: [
          { label: '🪦死亡', value: '13人' },
          { label: '👤失蹤', value: '33人' },
          { label: '🆘興隆山地區', value: '4村村名受困' },
        ],
        sources: [
          { name: '“Lanzhou-rio-amarillo-baita-shan-d02”by Colegota, CC BY-SA 2.5 ES, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Lanzhou-rio-amarillo-baita-shan-d02.jpg'},
          { name: '中國南北洪災不斷 甘肅暴雨13死 萬人撤離 廣州雨量創紀錄 災民水中求生', url:'https://tw.news.yahoo.com/%E4%B8%AD%E5%9C%8B%E5%8D%97%E5%8C%97%E6%B4%AA%E7%81%BD%E4%B8%8D%E6%96%B7-%E7%94%98%E8%82%85%E6%9A%B4%E9%9B%A813%E6%AD%BB-%E8%90%AC%E4%BA%BA%E6%92%A4%E9%9B%A2-%E5%BB%A3%E5%B7%9E%E9%9B%A8%E9%87%8F%E5%89%B5%E7%B4%80%E9%8C%84-%E7%81%BD%E6%B0%91%E6%B0%B4%E4%B8%AD%E6%B1%82%E7%94%9F-090433541.html'},
          { name:'國家災害防救科技中心-2025 中國甘肅省洪災肆虐(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26780/'}
        ]
      }
    ]
  },
  {
    id: 'uttarakhand-flashFlood-2025',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '印度喜馬拉雅突發洪災 (Uttarakhand Flash Flood)',
    location: '南亞 Uttarakhand, India',
    date: '2025/8/5',
    pages: [
      { 
        subtitle: '圖: 印度北阿坎德邦的克希爾甘加河 (Kheer Ganga River)\n印度 6~9 月的季風季，致命洪水和山體滑坡屢見不鮮，而氣候變化正在加劇災害的強度和頻率', 
        content: '北阿坎德邦喜馬拉雅山區的克希爾甘加河集水區突然暴發，滾滾洪流朝下游村莊奔騰而去，將山谷與村莊瞬間淹沒。\n當時雖處於季風季節，降雨量仍不足以解釋災害規模，專家推測可能是因冰川崩塌所導致的突發性洪水。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Dumping_of_Debris_into_the_Gori_Ganga_River_.jpg/960px-Dumping_of_Debris_into_the_Gori_Ganga_River_.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160527055307',
        impact: [
          { label: '🪦死亡', value: '4人↑' },
          { label: '👤失蹤', value: '100人↑' },
          { label: '!', value: '村莊被泥流掩埋' }
        ],
        detailImgTitle: '🗺️印度北阿坎德邦 地理位置',
        detailImg: '/images/uttarakhand-location.svg',
        sources: [
          { name: '"Dumping of Debris into the Gori Ganga River"by Ramwik, CC BY-SA 3.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Dumping_of_Debris_into_the_Gori_Ganga_River_.jpg' },
          {name: '"Location of Uttarakhand in India"by TUBS, CC BY-SA 3.0, Wikimedia Commons', url:'https://commons.wikimedia.org/wiki/File:Uttarakhand_in_India_(claimed_and_disputed_hatched).svg'},
          { name: '印喜馬拉雅山突發洪水 數百人失蹤', url: 'https://www.rfi.fr/tw/%E4%BA%9E%E6%B4%B2/20250805-%E5%8D%B0%E5%96%9C%E9%A6%AC%E6%8B%89%E9%9B%85%E5%B1%B1%E7%AA%81%E7%99%BC%E6%B4%AA%E6%B0%B4-%E6%95%B8%E7%99%BE%E4%BA%BA%E5%A4%B1%E8%B9%A4' },
          { name:'北印度暴洪沖毀喜馬拉雅山村 已知4死恐數十人失蹤', url:'https://www.cna.com.tw/news/aopl/202508050371.aspx'},
          { name:'洪水襲印度喜馬拉雅山區 村莊瞬間淹沒至少4死', url:'https://news.pts.org.tw/video/12389'}
        ]
      }
    ]
  },
  {
    id: 'kashmir-flashFlood-2025',
    region: 'southAsiaFLOOD',
    type: 'flood',
    title: '印控克什米爾突發洪災 (Kashmir Flash Flood)',
    location: '南亞 Kashmir, India',
    date: '2025/8/14',
    pages: [
      { 
        subtitle: '圖: 瑪恰爾村景象 (Machail Village) \n每年 7~9 月是瑪恰爾村的朝聖旺季，大批印度教信徒會前往此村的神廟朝聖', 
        content: '印控克什米爾喜馬拉雅山區發生突然降下暴雨，引發洪水和山崩。\n這是 2025 年，當地 8 月第二起致命洪災。當時正值瑪恰爾朝聖之旅，事發地「查索蒂小鎮」是通往朝聖目的地「瑪恰爾瑪塔神廟」的休息站，許多朝聖者聚在社區廚房一起吃午餐時，洪水突然捲走了他們。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/View_of_Machail_village.jpg/1920px-View_of_Machail_village.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20220621103608',
        impact: [
          { label: '🪦死亡', value: '46人↑' },
          { label: '🆘失蹤', value: '200人↑' },
        ],
        sources: [
          { name: '"View of Machail village"by Yash raina, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:View_of_Machail_village.jpg' },
          { name: 'At least 56 killed after torrential rains trigger flash floods in Kashmir', url: 'https://www.aljazeera.com/news/2025/8/14/at-least-37-killed-after-torrential-rains-trigger-flash-floods-in-kashmir' },
          { name: '印控克什米爾洪災 已知46死200多人失蹤', url: 'https://bccnews.com.tw/archives/712011' },
          { name:'公視-喜馬拉雅山區8月第二起致命洪災', url:'https://www.facebook.com/reel/4023871881163273'},
          { name:'國家災害防救科技中心-2025 印控克什米爾洪災(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26815/'}
        ]
      }
    ]
  },
  {
    id: 'northern-sichuan-flood',
    region: 'chinaFLOOD',
    type: 'flood',
    title: '2025四川洪災 (Northern Sichuan Floods)',
    location: '中國 川北地區',
    date: '2025/Sep',
    pages: [
      { 
        subtitle: '圖: 中國四川省廣元市朝天區景色', 
        content: '2025 的四川洪災，是四川北部該年最強的極端降雨事件之一，12 小時累積雨量超過 250 mm，其中朝天區更是達到四川省最大降雨量 255.2mm，短時間內城市積水。\n中國官方啟動防汛應急響應，最後聲明成功維持「零死亡」。', 
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Chaotian%2C_Guangyuan%2C_Sichuan%2C_China_-_panoramio_%2811%29.jpg/1920px-Chaotian%2C_Guangyuan%2C_Sichuan%2C_China_-_panoramio_%2811%29.jpg?_=20170614154539',
        sources: [
          { name: '“Chaotian, Guangyuan, Sichuan, China”by Leeshan Chung, CC BY 3.0, via Wikimedia Commons (Original from Panoramio)', url: 'https://commons.wikimedia.org/wiki/File:Chaotian,_Guangyuan,_Sichuan,_China_-_panoramio_(11).jpg' },
          { name: 'Northern Sichuan records heaviest rainfall of 2025, causing flash floods and evacuations', url:'https://watchers.news/2025/09/06/northern-sichuan-heaviest-rainfall-2025-flash-floods-evacuations/'},
          { name:'國家災害防救科技中心-2025 中國四川暴雨成災(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/27051/'}
        ]
      }
    ]
  },
//=====================野火野火野火野火野火野火===============
  {
    id: 'au-black-sat',
    region: 'australiaFIRE', 
    type: 'wildfire',
    title: 'Black Saturday Bushfires (黑色星期六)',
    location: 'Victoria, Australia',
    date: '2009/Feb',
    pages: [
      {
        subtitle: '黑色星期六後，被燒毀的房屋。 #焚風熱浪',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/CSIRO_ScienceImage_10424_Property_destroyed_by_fire_at_Kinglake_after_the_Black_Saturday_bushfires.jpg/1920px-CSIRO_ScienceImage_10424_Property_destroyed_by_fire_at_Kinglake_after_the_Black_Saturday_bushfires.jpg?_=20140919225243',
        detailImgTitle: '🗺️ 維多利亞州',
        detailImg: '', 
        content: '黑色星期六森林大火當天所有火災的能量總和相當於 1500 顆廣島原子彈，是澳洲史上最嚴重致命的野火事件。\n當時的維多利亞州處在長期乾旱、熱浪、強風下，電線過熱起火而爆發了大規模森林火災，當天火勢即迅速失控，多個城鎮幾乎全毀。',
        impact: [
          { label: '🪦死亡', value: '181人'},
          { label: '🔥燃燒面積', value: '12.5 萬公頃' },
          { label: '🏘️燒毀城鎮', value: 'x4' },
          { label: '💸經濟損失 (澳幣)', value: '44億 (900億 NTD)' },
          { label: '野生生物庇護中心', value: '焚毀 x2' },
          { label: '倖存者長期心理創傷', value: ' (PTSD)' }
        ],
        sources: [
          { name: '“CSIRO ScienceImage 10424 Property destroyed by fire at Kinglake after the Black Saturday bushfires”by Nick Pitsas, CSIRO, CC BY 3.0, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:CSIRO_ScienceImage_10424_Property_destroyed_by_fire_at_Kinglake_after_the_Black_Saturday_bushfires.jpg'},
          { name: 'The Inferno', url: 'https://www.newyorker.com/magazine/2009/10/26/the-inferno' },
          { name: '澳洲大火延燒120天、燒掉3個台灣，總理卻在度假？一文看透澳洲經濟與政治大洞', url: 'https://grinews.com/news/%E6%BE%B3%E6%B4%B2%E5%A4%A7%E7%81%AB%E5%BB%B6%E7%87%92120%E5%A4%A9%E3%80%81%E7%87%92%E6%8E%893%E5%80%8B%E5%8F%B0%E7%81%A3%EF%BC%8C%E7%B8%BD%E7%90%86%E5%8D%BB%E5%9C%A8%E5%BA%A6%E5%81%87%EF%BC%9F/' },
          { name: '澳洲酷熱氣候助長森林大火 181人喪生', url: 'https://www.e-info.org.tw/node/40977' },
          { name: '為了忘卻的紀念 ——「黑色星期六」十周年紀念特輯', url:'https://www.sameway.com.au/%E6%AF%8F%E9%80%B1%E8%A9%B1%E9%A1%8C/%E7%82%BA%E4%BA%86%E5%BF%98%E5%8D%BB%E7%9A%84%E7%B4%80%E5%BF%B5-%E3%80%8C%E9%BB%91%E8%89%B2%E6%98%9F%E6%9C%9F%E5%85%AD%E3%80%8D%E5%8D%81%E5%91%A8%E5%B9%B4%E7%B4%80%E5%BF%B5%E7%89%B9/'}
        ]
      }
    ]
  },
  {
    id: 'au-black-summer',
    region: 'australiaFIRE', 
    type: 'wildfire',
    title: 'Black Summer Bushfires (黑色夏季)',
    location: 'Australia',
    date: '2019-2020',
    pages: [
      {
        subtitle: '夏天，2020年的澳大利亞袋鼠島遭遇嚴重的山火肆虐，摧毀了當地的社區。',
        img: '/images/black-summer.jpg', 
        content: '黑色夏季是有記錄以來最嚴重的野火季節，焚燒範圍涵蓋澳洲東西南北全境。因其燒毀面積、持續時間，以及對野生動物的巨大衝擊，引發全球高度關注。\n\n2019 年12月起，南半球迎來夏季，當時澳洲處於異常高溫與長期乾旱狀態，又受印度洋偶極 (IOD) 正相位影響 (印度洋西側暖、東側冷) 使位在東印度洋的澳洲降雨減少。\n極度乾燥環境再加上強風與雷擊，造成多處起火，並讓野火迅速蔓延。\n隨後，2020 年 2 月出現大量降雨控制了火勢，卻也在多處地區引發洪患。 ',
        impact: [
          { label: '🔥燃燒面積', value: '1100 萬公頃↑' },
          { label: '🪦死亡', value: '33人' },
          { label: '☠️動物死亡', value: '10 億隻↑' },
          { label: 'CO₂ 3.06 億公噸', value: '> 2018年的1/2' },
          { label: '⚠️空汙擴散', value: '紐西蘭、南美洲' },
          { label: '🏚️建築物毀損 ', value: '2000棟↑' },
        ],
        sources: [
          { name: '“2019-20 Australian Bushfires-Kangaroo Island, South Australia”by New Matilda, CC BY 2.0', url: 'https://www.flickr.com/photos/newmatilda/51369022914'},
          { name: '國家災害防救科技中心-2020 2019/2020年澳洲野火事件衝擊影響探討', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/1384/10927/'}
        ]
      }
    ]
  },
  {
    id: 'au-ballarat',
    region: 'australiaFIRE', 
    type: 'wildfire',
    title: 'Ballarat Bushfire (澳洲巴拉瑞特野火)',
    location: 'Ballarat, Victoria, Australia',
    date: '2024/02/22',
    pages: [
      {
        subtitle: '衛星影像圖下，巴拉瑞特野火後的痕跡。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Bushfires_in_Australia%E2%80%99s_Ballarat_region_%28Copernicus_2024-02-29%29.jpg/1920px-Bushfires_in_Australia%E2%80%99s_Ballarat_region_%28Copernicus_2024-02-29%29.jpg?_=20240816145612', 
        content: '火災發生前，維多利亞省已長期處於炎熱、乾旱且風力強勁的條件，造成植被極度乾燥，大幅提高野火的機率。官方對鄰近 28 個社區發布緊急警告及撤離，鄰近道路封閉和停電影響了當地約 2100 多戶居民。',
        sources: [
          { name: '“Bushfires in Australia’s Ballarat region (Copernicus 2024-02-29)”by European Union, Copernicus Sentinel-2 imagery, Contains modified Copernicus Sentinel data 2024, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Bushfires_in_Australia%E2%80%99s_Ballarat_region_(Copernicus_2024-02-29).jpg' },
          { name: '國家災害防救科技中心-2024 澳洲巴拉瑞特野火(2月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13251/'}
        ]
      }
    ]
  }, 
  {
    id: 'au-grampians',
    region: 'australiaFIRE', 
    type: 'wildfire',
    title: 'Grampians Bushfire (格蘭屏森林大火)',
    location: 'Grampians National Park, Victoria, Australia',
    date: '2024/Dec',
    pages: [
      {
        subtitle: '衛星圖由左至右顯示，自2024年12月起，格蘭屏國家公園的受災面積不斷擴大。\n通常野火後，森林生態恢復需要長達數十年。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Devastating_bushfires_in_the_Grampians_National_Park%2C_Australia_%28Copernicus_2025-02-10%29.png/1920px-Devastating_bushfires_in_the_Grampians_National_Park%2C_Australia_%28Copernicus_2025-02-10%29.png?_=20250210120537', 
        content: '這是一場因雷擊引發的森林大火，當時澳洲政府發布最高等級的緊急撤離警報作為應對。在高溫、強風、植被乾燥的環境下，火勢短時間迅速在維多利亞州格蘭屏國家公園蔓延，燒毀了公園總面積的三分之一。 \n\n▌格蘭屏國家公園是澳大利亞維州的自然保護區，以其瀑布、野生動物和原住民文化遺產而聞名。',
        impact: [
          { label: '🔥燃燒面積', value: '76,000 公頃' },
          { label: '🏞️原生棲息地', value: '大片燒毀' },
          { label: '🐨野生動物', value: '大量受傷' },
        ],
        sources: [
          { name: '“Devastating bushfires in the Grampians National Park, Australia (Copernicus 2025-02-10)”by European Union, Copernicus Sentinel-2 imagery, Contains modified Copernicus Sentinel data 2024, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Devastating_bushfires_in_the_Grampians_National_Park,_Australia_(Copernicus_2025-02-10).png'},
          { name: '澳洲國家公園叢林大火 延燒面積相當整個新加坡', url: 'https://www.cna.com.tw/news/aopl/202412270099.aspx' },
          { name: '澳洲野火失去控制恐延燒數天 當局敦促居民撤離', url: 'https://www.cna.com.tw/news/aopl/202412220059.aspx' },
          { name: '國家災害防救科技中心-2024 澳洲森林大火(12月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/23825/'}
        ]
      }
    ]
  },
  {
    id: 'au-southeast-2026',
    region: 'australiaFIRE', 
    type: 'wildfire',
    title: '2026 Victorian Bushfires (2026 1月澳洲野火)',
    location: 'NSW & Victoria, Australia',
    date: '2026/Jan',
    pages: [
      {
        subtitle: '圖: 維州雅拉河谷五星級羅富酒莊的葡萄園\n此次火災未直接波及雅拉河谷，但葡萄中是否含煙燻物質難以在釀酒前準確偵測出來 #維州葡萄產區收割季',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Rochford_Wines_vineyard_in_Yarra_Valley_Australia.jpg/1920px-Rochford_Wines_vineyard_in_Yarra_Valley_Australia.jpg?_=20141102022406', 
        content: '1月是澳洲的夏天，東南部面臨 16 年來最極端的熱浪侵襲，打破歷史高溫紀錄。\n當時氣溫飆升至 40°C 以上，雪梨達 42.2°C，墨爾本突破 45°C，維州測得 48.9°C，新南威爾斯州則接近 50°C。\n如此熱浪下，澳洲東南部爆發大規模野火，成為繼2019年「黑色夏季」後最嚴峻的火災事件之一。\n\n🍇農業經濟衝擊--葡萄酒產區\n• 即將採收的葡萄藤被燒毀\n• 煙害污染 (smoke taint) : 空氣中的濃煙會影響葡萄果實，使葡萄無法用來釀酒。\n• 小型酒莊面臨生存危機',
        impact: [
          { label: '🔥燃燒面積', value: '30 萬公頃' },
          { label: '🔦停電', value: '38,000 戶' },
          { label: '🏚️建築物毀損 ', value: '130 棟↑' },
        ],
        sources: [
          { name: '“Rochford Wines vineyard in Yarra Valley Australia”by MusikAnimal, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Rochford_Wines_vineyard_in_Yarra_Valley_Australia.jpg'},
          { name: '澳洲叢林大火逾3.8萬戶停電　維州宣布災難狀態', url: 'https://www.cna.com.tw/news/aopl/202601100094.aspx' },
          { name: '澳洲熱浪引發毀滅性野火，維多利亞州宣布進入災難狀態，數萬戶停電', url: 'https://tw.stock.yahoo.com/news/%E6%BE%B3%E6%B4%B2%E7%86%B1%E6%B5%AA%E5%BC%95%E7%99%BC%E6%AF%80%E6%BB%85%E6%80%A7%E9%87%8E%E7%81%AB-%E7%B6%AD%E5%A4%9A%E5%88%A9%E4%BA%9E%E5%B7%9E%E5%AE%A3%E5%B8%83%E9%80%B2%E5%85%A5%E7%81%BD%E9%9B%A3%E7%8B%80%E6%85%8B-%E6%95%B8%E8%90%AC%E6%88%B6%E5%81%9C%E9%9B%BB-015710482.html' },
          { name: '國家災害防救科技中心-2026 澳洲東南部野火成災(1月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/28279/28363/'}
        ]
      }
    ]
  },
  {
    id: 'california-fire-2025-00',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: '2025 1月美國南加州野火災害：總覽',
    location: 'LA, California, USA',
    date: '2025/01/07',
    pages: [
      {
        subtitle: '美國林業局發動特遣部隊進行帕利塞茲野火搶救工作',
        content: '▌在加州，較冷的月份常有強勁的「聖安娜焚風」，由美國內陸沙漠往東吹向南加州。\n焚風會導致濕度下降，使植被和土壤更乾燥，容易發生火災與加重火勢。\n\n主要火場\n• Palisades Fire (帕利塞茲野火)\n• Eaton Fire (伊頓大火)\n\n警告: 洛杉磯出現紅褐色二氧化氮氣體，這種氣體不僅對人體健康有害，還會促進地面臭氧與顆粒物形成，加劇污染。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/58/2025_Southern_California_fires_and_the_United_States_Forest_Service_%28USFS%29_-_Taskforce_1600_at_the_Palisades_Fire_%2854264940069%29.jpg?_=20250113212427',
        impact: [
          { label: '🔥燒毀面積', value: '233.7 km²' },
          { label: '💸經濟損失', value: '$2,750 億美元' },
          { label: '☠️空汙警告', value: '紅褐色二氧化氮氣體' }
        ],
        sources: [
          { name: '“2025 Southern California fires and the United States Forest Service (USFS) - Taskforce 1600 at the Palisades Fire (54264940069)”by Pacific Southwest Forest Service, USDA, Public Domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:2025_Southern_California_fires_and_the_United_States_Forest_Service_(USFS)_-_Taskforce_1600_at_the_Palisades_Fire_(54264940069).jpg' },
          { name: 'Visual explainer: why are the LA wildfires so bad?', url:'https://www.theguardian.com/us-news/2025/jan/08/fire-map-la-palisades-explainer'},
          { name: '國家災害防救科技中心-2025 美國南加州野火災害事件報導', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/24643/'}
        ]
      }
    ]
  },
  {
    id: 'california-fire-2025-01',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'Eaton Fire (伊頓大火)',
    location: 'LA, California, USA',
    date: '2025/01/07',
    pages: [
      {
        subtitle: '大型空中滅火機 Erickson Aero Tanker MD-87 Fire Bomber 正在投放阻燃劑',
        content: '伊頓大火是 2025 年加州野火事件主要的火場之一，也是加州歷史上第二大具破壞性的野火事件。起火原因不明，電力設備故障為可能的起火源。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/20250113-fire-bomber-md-87-eaton-fire-0.jpg/1920px-20250113-fire-bomber-md-87-eaton-fire-0.jpg?_=20250114064408',
        impact: [
          { label: '🪦死亡', value: '17 人' },
          { label: '🤕受傷', value: '9 人' },
          { label: '🏚️建物毀損', value: '9413 棟' },
        ],
        sources: [
          { name: '“20250113-fire-bomber-md-87-eaton-fire-0”by Grigory Heaton, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:20250113-fire-bomber-md-87-eaton-fire-0.jpg' },
          { name: '國家災害防救科技中心-2025 美國南加州野火災害事件報導', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/24643/'}
        ]
      }
    ]
  },
  {
    id: 'california-fire-2025-02',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'Palisades Fire (帕利塞茲野火)',
    location: 'LA, California, USA',
    date: '2025/01/07',
    pages: [
      {
        content: '帕利塞茲野火是 2025 年加州野火事件主要的火場之一，同時是加州歷史上第三大具破壞性的野火事件。\n當時恰好帕利塞茲區域用水需求激增，連續 15 小時用水量接近平時四倍，使得水壓下降，消防員試圖撲滅大火時，數十個消防栓無法及時補水，嚴重影響救災行動。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/2025_Palisades_Fire_Seen_From_Palisades_Drive_%28cropped%29.jpg/1280px-2025_Palisades_Fire_Seen_From_Palisades_Drive_%28cropped%29.jpg?_=20250109020729',
        impact: [
          { label: '🪦死亡', value: '12 人' },
          { label: '🤕受傷', value: '4 人' },
          { label: '🏚️建物毀損', value: '6833 棟' },
        ],
        sources: [
          { name: '“2025 Palisades Fire Seen From Palisades Drive (cropped)”by Ariam23, CC BY 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:2025_Palisades_Fire_Seen_From_Palisades_Drive_(cropped).jpg' },
          { name: '國家災害防救科技中心-2025 美國南加州野火災害事件報導', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/24643/'}
        ]
      }
    ]
  },
  {
    id: 'jones-road-fire-2025',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'Jones Road Wildfire (瓊斯路大火)',
    location: 'New Jersey, USA',
    date: '2025/4/22',
    pages: [
      {
        subtitle: '美國紐澤西州20年最大野火，燒掉200座大安森林公園\n#美國東岸罕見大火',
        content: '紐澤西並非傳統野火區，當時全州卻處於異常乾旱狀態，使林植被變得乾燥易燃，而出現大規模野火，紐澤西州最繁忙的高速公路 Garden State Parkway (花園州公園大道) 緊急封閉。\n瓊斯路大火顯示氣候變遷正在提升非典型地區的野火風險。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Jones_Road_Fire_on_April_22%2C_2025.jpg?_=20250423192935',
        impact: [
          { label: '電力公司切斷供電', value: '25000 戶↑' },
          { label: '🏃‍♂️撤離', value: '3000 人'},
          { label: '☠️警告', value: '空氣品質惡化' },
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4098163.9086571843!2d-73.89991109059933!3d40.21087066574902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c0fb959e00409f%3A0x2cd27b07f83f6d8d!2z576O5ZyL57SQ5r6k6KW_!5e0!3m2!1szh-TW!2stw!4v1779627502481!5m2!1szh-TW!2stw', 
        sources: [
          { name: '“Jones Road Fire on April 22, 2025”by Unknown author, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Jones_Road_Fire_on_April_22,_2025.jpg'},
          { name: '新澤西野火已燒毀上萬英畝地 數千居民急撤', url:'https://www.epochtimes.com/b5/25/4/24/n14490442.htm'},
          { name: '紐澤西野火擴大逾5千人急撤離！20年最大野火 燒掉200座大安森林公園', url:'https://tw.news.yahoo.com/%E7%B4%90%E6%BE%A4%E8%A5%BF%E9%87%8E%E7%81%AB%E6%93%B4%E5%A4%A7%E9%80%BE5%E5%8D%83%E4%BA%BA%E6%80%A5%E6%92%A4%E9%9B%A2-20%E5%B9%B4%E6%9C%80%E5%A4%A7%E9%87%8E%E7%81%AB-%E7%87%92%E6%8E%89200%E5%BA%A7%E5%A4%A7%E5%AE%89%E6%A3%AE%E6%9E%97%E5%85%AC%E5%9C%92-102415270.html'},
          { name: '美國紐澤西州野火燃燒 下令關閉高速公路急撤離3千人', url:'https://news.ltn.com.tw/news/world/breakingnews/5020649'},
          { name:'國家災害防救科技中心-2025 美國紐澤西州野火(4月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/25777/'}
        ]
      }
    ]
  },
  {
    id: 'southEU-2025',
    region: 'southEU', 
    type: 'wildfire',
    title: '2025 南歐森林野火總集',
    location: 'Southern Europe',
    date: '2025/Jun ~ Aug',
    pages: [
      {
        subtitle: '#南歐野火季 #極端熱浪\n希臘希俄斯島 (Chios) 野火衛星雲圖，火場煙霧飄散籠罩愛琴海上空',
        content: '2025 年夏季，因連續熱浪與乾旱爆發數場跨國野火，整個南歐都在為野火疲於奔命。\n其中包含伊比利半島、希臘、南法地區與阿爾巴尼亞等，甚至波及中東歐國家。\n2025 年歐洲野火面積為同期平均「2 倍」，是至今為止歐洲野火蔓延最嚴重的一年。\n\n特徵\n• 易燃環境 : 極端熱浪、強風，與長期乾旱\n• 多國同時出現數十個火場\n• 法國奧德省爆發 80 年來最大野火\n• 西班牙：20 多地同時起火\n• 希臘：高溫達 45°C\n\n氣候變遷與歐洲\n根據歐盟哥白尼氣候變遷服務的數據，歐洲是世界上暖化速度最快的洲，自 1980 年代以來，歐洲氣溫上升的速度是全球平均的2倍。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Multiple_Wildfires_Scorch_Chios%2C_Greece_%28MODIS_2025-06-25%29.jpg/1920px-Multiple_Wildfires_Scorch_Chios%2C_Greece_%28MODIS_2025-06-25%29.jpg?_=20250625040547',
        detailImgTitle: '',
        detailImg: '', // 卡片 Body 圖
        impact: [
          { label: '🔥總燒毀面積', value: '44 萬公頃' },
          { label: '🏃‍♂️撤離', value: '上萬人' },
          { label: '☠️警告', value: '空氣品質嚴重惡化' },
        ],
        sources: [
          { name: '“Multiple Wildfires Scorch Chios, Greece (MODIS 2025-06-25)”by MODIS Land Rapid Response Team, NASA GSFC, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Multiple_Wildfires_Scorch_Chios,_Greece_(MODIS_2025-06-25).jpg' },
          { name: 'France’s largest wildfire in decades leaves trail of devastation', url:'https://www.bordertelegraph.com/news/national/25371995.frances-largest-wildfire-decades-leaves-trail-devastation/'},
          { name: '歐洲熱浪野火蔓延 部分地區燒毀面積比平均大2倍', url:'https://news.pts.org.tw/article/765549'},
          { name:'國家災害防救科技中心-2025 南歐森林火災(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26827/'}
        ]
      }
    ]
  },
  {
    id: 'southEU-corbieres-2025',
    region: 'southEU', 
    type: 'wildfire',
    title: 'Corbières Massif wildfire (科比埃野火 )',
    location: 'Corbières, Aude, France',
    date: '2025/8/5',
    pages: [
      {
        subtitle: '#南歐夏季極端天氣',
        content: '科比埃野火是法國近 80 年來最大野火之一，火場面積超過了整座巴黎市。\n火災事發於南法奧德省的科比埃山區，受到高溫、乾燥與強風影響，火場快速擴大，波及葡萄園、酒莊、住宅區、道路與基礎設施。\n法國政府形容這是一場與氣候變遷有關的空前災難，也是自 2006 年建立國家火災資料庫以來最大的一場火災。\n\n🍇衝擊葡萄酒產業\n• 煙霧和阻燃劑，導致葡萄酒不符合標準\n• 影響 1500 公頃葡萄園 (= 大安森林公園 x 55)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Feu_Montseret_Jour_6_Aout.jpg/1920px-Feu_Montseret_Jour_6_Aout.jpg?_=20250914052938',
        impact: [
          { label: '🪦死亡&受傷🤕', value: '19 人'},
          { label: '🏃‍♂️撤離', value: '居民與遊客' },
          { label: '🔦停電', value: '⛔道路封閉' },
        ],
        sources: [
          { name: '“Feu Montseret Jour 6 Aout”by T Clvrc, CC BY 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Feu_Montseret_Jour_6_Aout.jpg' },
          { name: 'France’s largest wildfire in decades leaves trail of devastation', url:'https://www.bordertelegraph.com/news/national/25371995.frances-largest-wildfire-decades-leaves-trail-devastation/'},
          { name: '法國近80年最大野火受控　延燒1萬6000公頃釀1死', url:'https://www.cna.com.tw/news/aopl/202508080254.aspx'},
          { name: '根瘤蚜虫袭击加那利群岛，美国酒精消费量暴跌，2025年采收开始', url:'https://www.jancisrobinson.com/zh-hans/articles/phylloxera-hits-canaries-us-alcohol-consumption-plummets-harvest-2025-starts'},
          { name: '法國南部森林野火延燒 總理稱災難規模空前', url:'https://news.pts.org.tw/article/764434'},
          { name:'國家災害防救科技中心-2025 法國奧德省爆發嚴重野火(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/24616/26805/'}
        ]
      }
    ]
  },
  {
    id: 'grand-canyon-00',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: '2025 美國大峽谷野火：總覽',
    location: 'Grand Canton, Arizona, USA',
    date: '2025/Jul',
    // 這裡我也幫妳包進 pages 裡，這樣 EventModal 才讀得到
    pages: [
      {
        subtitle: '#雷擊',
        content: '當時美國大峽谷正值高溫 (32°C)、極低濕度、植被乾燥，以及強風，導致雷擊引發的星星火源擴散迅速。\n\n 主要火場\n  • Dragon Bravo Fire (龍布拉沃大火)\n  • White Sage Fire (白鼠尾草大火)',
        img: 'https://www.nps.gov/grca/images/Angels-Window-3-20-26-MForrest_1.jpg?maxwidth=1300&maxheight=1300&autorotate=false&format=webp',
        detailImgTitle: '🗺️ 亞利桑那州',
        detailImg: '/images/Arizona.png', // 卡片 Body 圖
        impact: [
          { label: '⛔現況', value: '北緣關閉至年底' },
          { label: '💸經濟影響', value: '觀光收入中斷' },
          { label: '☠️警告', value: '空氣含氯' }
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d825355.3268564676!2d-112.843134!3d36.09240944999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x873312ae759b4d15%3A0x1f38a9bec9912029!2z5aSn5bO96LC35ZyL5a625YWs5ZyS!5e0!3m2!1szh-TW!2stw!4v1777636025730!5m2!1szh-TW!2stw', 
        sources: [
          { name: 'The title photo is from NPS.gov', url: 'https://www.nps.gov/grca/northrimstatus.htm' },
          { name: '雷擊引發 美國大峽谷2場野火肆虐 當局籲當心氯氣暴露風險', url:'https://www.taiwannews.com.tw/zh/news/6155085'},
          { name: '美國大峽谷附近野火延燒 24小時擴大近20倍面積', url:'https://www.cna.com.tw/news/aopl/202507130116.aspx'}
        ]
      }
    ]
  },
  {
    id: 'grand-canyon-01',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'Dragon Bravo Fire (龍布拉沃大火)',
    location: 'North Rim, Grand Canyon National Park',
    date: '2025/7/4',
    pages: [
      {
        subtitle: '88年歷史的大峽谷旅館 Grand Canyon Lodge 被大火燒毀 ',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Dragon_Bravo_Fire_-_NPS_Photo_from_July_18%2C_2025_%2854665547001%29.jpg/1920px-Dragon_Bravo_Fire_-_NPS_Photo_from_July_18%2C_2025_%2854665547001%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20250722114831',  // 第二頁的 Header 換成救援直升機的圖
        detailImgTitle: '🗺️ 龍布拉沃火界範圍',
        detailImg: '/images/DragonB.jpg', // Body 換成消防員工作的照片
        content: '大峽谷國家公園北緣的「龍布拉沃大火」由雷擊引發，因強風爆發式燃燒，是亞利桑那州歷史規模最大的野火之一，火勢一度失控，毀損國家公園設施，並在事後出現氯氣外洩風險。\n大峽谷國家公園北緣步也因為火災全面封鎖，導致許多遊客的旅遊計畫被迫中斷。',
        impact: [
          { label: '🔥燒毀面積', value: '145,000 英畝' },
          { label: '💸經濟影響', value: '⏸觀光中斷' },
          { label: '🏚️歷史建築燒毀', value: '大峽谷旅館' }
        ],
        sources: [
          { name: '"Dragon Bravo Fire - NPS Photo from July 18, 2025 (54665547001)"by Grand Canyon NPS, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Dragon_Bravo_Fire_-_NPS_Photo_from_July_18,_2025_(54665547001).jpg' },
          { name: '(cropped) "2025 Grand Canyon North Rim Fires Map"by Stephanie Smith, Grand Canyon Trust', url: 'https://www.grandcanyontrust.org/resources/2025-grand-canyon-north-rim-fires-map/' }
        ]
      }
    ]
  },
  // 其他大峽谷資料也請依照這個 pages 格式包起來...
  {
    id: 'grand-canyon-02',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'White Sage Fire (白鼠尾草大火)',
    location: 'near Jacob Lake, Kaibab National Forest',
    date: '2025/7/10',
    pages: [
      {
        subtitle: '#雷擊',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/White_Sage_Fire_%2854671853366%29.jpg/1920px-White_Sage_Fire_%2854671853366%29.jpg?_=20250724114631',
        detailImgTitle: '🗺️ 白鼠尾草火界範圍 (下方火場為龍布拉沃)',
        detailImg: '/images/white-sage.jpg', 
        content: '白鼠尾草火場同 Dragon Bravo Fire (龍布拉沃大火) 在美國大峽谷發生，且因雷擊引起，不過，這場大火發生在更北邊。\n乾燥、高溫與強風的條件，讓白鼠尾草火場的火勢得以迅速擴散，24 小時內燃燒面積由 1 千英畝暴增至 2 萬英畝，並南下蔓延。',
        impact: [
          { label: '🔥燒毀面積', value: '49000 英畝' },
          { label: '⏸️交通中斷', value: '89A 公路封閉' },
          { label: '威脅歷史建築', value: 'Jacob Lake Lodge' }
        ],        
        sources: [
          { name: '“White Sage Fire (54671853366)”by BLMArizona, Public Domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:White_Sage_Fire_(54671853366).jpg' },
          { name: '(cropped) "2025 Grand Canyon North Rim Fires Map"by Stephanie Smith, Grand Canyon Trust', url: 'https://www.grandcanyontrust.org/resources/2025-grand-canyon-north-rim-fires-map/' },
          { name: 'White Sage Fire in northern Arizona burns 49,286 acres, prompts evacuations, road closures', url:'https://kutv.com/news/wildfire/white-sage-fire-in-northern-arizona-burns-49286-acres-prompts-evacuations-road-closures'}
        ]
      }
    ]
  },
  {
    id: 'ranger-road-fire-2026',
    region: 'usaFIRE', 
    type: 'wildfire',
    title: 'Ranger Road Fire (2026 奧克拉荷馬州野火)',
    location: 'Oklahoma, USA',
    date: '2026/Feb',
    pages: [
      {
        subtitle: '衛星圖顯示了此場火災留下的大片燒痕',
        content: '這是美國中南部近年不尋常發生的冬季大規模野火，“Ranger Road Fire” 為主要火場。受高溫、低濕度與時速超過 100 公里的強風影響，火勢迅速擴散，跨州蔓延，在短短 24 小時內燃燒面積翻倍。',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Large_Burn_Scar_of_the_Ranger_Road_Fire_%28CIRA_2026-02-18_-_nolabels%29.png/1920px-Large_Burn_Scar_of_the_Ranger_Road_Fire_%28CIRA_2026-02-18_-_nolabels%29.png?_=20260220095059',
        detailImgTitle: '🗺️ 奧克拉荷馬州',
        detailImg: '', // 卡片 Body 圖
        impact: [
          { label: '🔥燒毀面積', value: '122,000 公頃' },
          { label: '💸經濟損失', value: '農業與畜牧業'},
          { label: '⛔公路封閉', value: '283、160、183' }
        ],
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26135992.006486412!2d-113.31593253245502!3d32.14390602770554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ac3911b1ac4f9d%3A0x5d1ccf33400aea48!2z576O5ZyL5aWn5YWL5ouJ6I236aas!5e0!3m2!1szh-TW!2stw!4v1779629306208!5m2!1szh-TW!2stw', 
        sources: [
          { name: '“Large Burn Scar of the Ranger Road Fire (CIRA 2026-02-18 - nolabels)”by JPSS imagery: CSU/CIRA & NOAA/NESDIS, Public doamin, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Large_Burn_Scar_of_the_Ranger_Road_Fire_(CIRA_2026-02-18_-_nolabels).png' },
          { name: 'Ranger Road Fire doubles in size in one day, reaching over 114650 ha (283000 acres) in Kansas-Oklahoma', url:'https://watchers.news/2026/02/19/ranger-road-fire-doubles-in-size-in-one-day-reaching-over-114-650-ha-283-000-acres-in-kansas-oklahoma/'},
          { name: 'State of Emergency declared in Oklahoma as wildfires scorch over 72770 ha (155000 acres)', url:'https://watchers.news/2026/02/18/state-of-emergency-declared-in-oklahoma-as-wildfires-scorch-over-72-770-ha-155-000-acres/'},
          { name:'國家災害防救科技中心-2026 美國奧克拉荷馬州發生野火(2月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/28279/28652/'}
        ]
      }
    ]
  },
  //===============颶風颱風氣旋===============
  {
    id: 'typhoon-tw-88',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '八八風災 (The 88 Flood)',
    location: 'Taiwan',
    date: '2009/8/8',
    pages: [
      { 
        subtitle: '那瑪夏鄉舊鄉公所附近，88水災後殘留的土石與廢棄房舍\n#中度颱風 #莫拉克颱風 #Typhoon Morakot 2009', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/%E9%82%A3%E7%91%AA%E5%A4%8F%E9%84%8988%E6%B0%B4%E7%81%BD%E5%BE%8C%E5%A0%B4%E6%99%AF.JPG/1920px-%E9%82%A3%E7%91%AA%E5%A4%8F%E9%84%8988%E6%B0%B4%E7%81%BD%E5%BE%8C%E5%A0%B4%E6%99%AF.JPG?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20100506013935',
        content: '中度莫拉克颱風於 2009 年 8 月 (民國 98 年 8 月) 侵襲台灣，影響的時間為 8/6 ~ 8/10，而 8/8 是降雨最極端、多數重大災害發生的一天。\n受到當時左右兩邊有柯尼颱風與艾陶颱風，加上太平洋高壓引導力弱，莫拉克颱風移動相當緩慢，導致長時間降雨並引發大量土石流與山崩，多條河川氾濫。',
        impact: [
          { label: '🌊淹水面積', value: '765km² (台北x2.8)' },
          { label: '🪦死亡', value: '677 人' },
          { label: '👤失蹤', value: '22 人' },
          { label: '🛖高雄縣甲仙鄉', value: '小林村滅村' },
          { label: '💸設施及農產損失', value: '194.1 億元' }
        ],
        sources: [
          { name: '“那瑪夏鄉88水災後場景”by Reke Wang, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:%E9%82%A3%E7%91%AA%E5%A4%8F%E9%84%8988%E6%B0%B4%E7%81%BD%E5%BE%8C%E5%A0%B4%E6%99%AF.JPG'},
          { name:'國家災害防救科技中心-2009 莫拉克颱風', url:'https://den.ncdr.nat.gov.tw/1330/1334/1335/15738/21720/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-jp-talas',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '2022 塔拉斯颱風 (Tropical Storm Talas)',
    location: 'Central Japan',
    date: '2022/Sep',
    pages: [
      { 
        subtitle: '塔拉斯颱風導致 362 號國道路在靜岡市葵區崩塌\n#熱帶氣旋 #tropical Storm #異常多的降雨', 
        img:'https://upload.wikimedia.org/wikipedia/commons/d/d5/2022_Tropical_Storm_Talas_damage_in_Shizuoka.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20230818113649',
        content: '塔拉斯颱風主要影響靜岡縣，雖然後來減弱為溫帶低氣壓，卻還是為日本當地帶來死傷災情。加上線狀降水帶，當地 2 日內累積雨量達 417mm，等於往年同月的整月降雨量之規模。',
        impact: [
          { label: '🪦死亡', value: '2 人' },
          { label: '民宅遭土石崩落壓毀', value: '3 棟' },
          { label: '🔦停電', value: '12 萬戶↑' },
        ],
        sources: [
          { name: '“2022 Tropical Storm Talas damage in Shizuoka”by 内閣府, CC BY-SA 4.0, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:2022_Tropical_Storm_Talas_damage_in_Shizuoka.jpg' },
          { name: 'Two dead, thousands without power after Typhoon Talas slams Japan', url:'https://www.brecorder.com/news/40199462/two-dead-thousands-without-power-after-typhoon-talas-slams-japan'},
          { name: '颱風塔拉斯襲日本靜岡破紀錄大雨 橋斷土石崩落釀死傷', url:'https://www.cna.com.tw/news/aopl/202209240052.aspx'},
          { name:'國家災害防救科技中心-2022 颱風Talas侵襲日本中部(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/12053/12369/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-jp-mawar',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '瑪娃颱風 (Typhoon Mawar)',
    location: 'Guam & Japan',
    date: '2023/May~Jun',
    pages: [
      { 
        subtitle: '5月24日星期三，颱風「瑪瓦爾」登陸關島，對全島造成嚴重破壞', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Typhoon_Mawar_Destruction_8.jpg/1920px-Typhoon_Mawar_Destruction_8.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20230525231552',
        content: '每年 5 月下旬至 6 月，是日本的梅雨季。此次瑪娃颱風加梅雨，加劇降雨強度與時間，使日本 23 個地區在 24 小時累積雨量分別創下當地觀測史紀錄。\n除了大雨和土石流，瑪娃也造成風暴潮，威脅低窪地區。\n由於大雨，東海道新幹線東京站到名古屋站停駛 22 小時，5300 人留宿新幹線車廂，車站內十分擁擠混亂，甚至出動警方維護秩序。',
        impact: [
          { label: '🪦死亡', value: '2 人' },
          { label: '⛔關島機場封閉', value: '115 名台灣旅客滯留' },
          { label: '🔦停電', value: '17500 戶' },
        ],
        sources: [
          { name: '“Typhoon Mawar Destruction 8”by U.S. FEMA photo by Robert Barker, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Typhoon_Mawar_Destruction_8.jpg' },
          { name: '「颱風瑪娃+梅雨」夾擊日本！雨量強灌近500毫米 釀1死3失聯', url:'https://www.ettoday.net/news/20230603/2512694.htm'},
          { name: '颱風瑪娃加梅雨鋒面侵襲日本 釀1死3失聯23地破雨量紀錄', url:'https://www.cna.com.tw/news/aopl/202306030181.aspx'},
          { name:'國家災害防救科技中心-2023 瑪娃颱風影響關島、日本(5月-6月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/12676/12879/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-jp-yunyeung',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '鴛鴦颱風 (Tropical Storm Yun-yeung)',
    location: 'Japan',
    date: '2023/Sep',
    pages: [
      { 
        subtitle: '日本福島縣國寶級建物「白水阿彌陀堂」\n#熱帶氣旋 #Tropical Storm', 
        img:'https://upload.wikimedia.org/wikipedia/commons/c/c1/Shiramizu_amidadou.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20090421012215',
        content: '鴛鴦颱風實際接近日本時減弱為熱帶性低氣壓，並未登陸，但仍為關東與東北地區造成嚴重災情，共計有 100 處以上地區土石崩塌。\n當時大氣狀況相當不穩定，形成線狀對流 (連續排列的強降雨雲帶)，引發極端強降雨，千葉縣每小時降雨量達 100 毫米以上。\n這期間日本總共發布 10 次「創紀錄短時間大雨情報」。',
        impact: [
          { label: '🪦死亡', value: '3 人' },
          { label: '福島縣白水阿彌陀堂', value: '🌊淹水' },
          { label: '🔦停電', value: '10900 戶↑' },
        ],
        sources: [
          { name: '"Shiramizu amidadou"by 日文維基百科的Wiiii, CC BY-SA 3.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Shiramizu_amidadou.jpg' },
          { name: '颱風鴛鴦轉低氣壓降大雨 日本國寶建物及逾千民宅泡水', url:'https://www.cna.com.tw/news/aopl/202309090199.aspx'},
          { name: '颱風鴛鴦「沒登陸日本」仍釀3死！雨彈狂炸 17萬戶緊急避難', url:'https://www.ettoday.net/news/20230909/2578994.htm'},
          { name:'國家災害防救科技中心-2023 鴛鴦颱風影響日本(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/12676/13061/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-jp-shanshan',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '珊珊颱風 (Typhoon Shanshan)',
    location: 'Japan',
    date: '2024/Aug',
    pages: [
      { 
        subtitle: '因颱風珊珊，神奈川縣一家超市的國產豬絞肉被一掃而空\n#中度颱風', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Sold_out_sign_because_of_Typhoon_Shanshan_-_Kanagawa_-_2024_Aug_31.jpeg/1920px-Sold_out_sign_because_of_Typhoon_Shanshan_-_Kanagawa_-_2024_Aug_31.jpeg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240831090509',
        content: '珊珊颱風主要影響九州地區，帶來強風與極端降雨，其中靜岡縣 72 小時累積雨量超過 600 毫米。暴雨造成河川氾濫、淹水損海、山崩與土石流等。',
        impact: [
          { label: '🪦死亡', value: '8 人' },
          { label: '🤕受傷', value: '127 人' },
          { label: '🏚️建物受損', value: '2000 棟↑' },
          { label: '🛫航班取消❌', value: '633 班↑' },
          { label: '⚠️坡地崩塌', value: '66 處' },
          { label: '🚨九州地區', value: '海岸設施損壞' },
        ],
        sources: [
          { name: '“Sold out sign because of Typhoon Shanshan - Kanagawa - 2024 Aug 31”by Nesnad, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Sold_out_sign_because_of_Typhoon_Shanshan_-_Kanagawa_-_2024_Aug_31.jpeg' },
          { name: '颱風珊珊撲日本釀4死近百傷 2地降破紀錄大雨', url:'https://www.cna.com.tw/news/aopl/202408300057.aspx'},
          { name: '颱風「珊珊」襲日本 造成7死127傷', url:'https://www.dotdotnews.com/s/202409/01/AP66d4600de4b0d645a769febc.html'},
          { name:'國家災害防救科技中心-2024 珊珊颱風對日本之災害記錄(8月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13455/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-tw-karathon',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '山陀兒颱風 (Typhoon Karathon)',
    location: 'Taiwan',
    date: '2024/Oct',
    pages: [
      { 
        subtitle: '高雄市交通局搶修山陀兒颱風受損紅綠燈\n#強烈颱風', 
        img:'https://upload.wikimedia.org/wikipedia/commons/f/f8/%E9%AB%98%E9%9B%84%E5%B8%82%E4%BA%A4%E9%80%9A%E5%B1%80%E6%90%B6%E4%BF%AE%E5%B1%B1%E9%99%80%E5%85%92%E9%A2%B1%E9%A2%A8%E5%8F%97%E6%90%8D%E7%B4%85%E7%B6%A0%E7%87%88_08.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20241007071756',
        content: '山陀兒颱風的特色是路徑不穩定且移動極慢，警報發布超過 4 天，才在 10/3 於高雄登陸，同時這也是 47 年來首個登陸高雄的颱風。\n山陀兒登陸前後，氣象署針對高屏地區發布 3 次強風告警，在高雄港的二港口觀測站實際記錄到 17 級風，連沉重的貨櫃都被風吹著跑。\n\n▌! 中央大學平時冬天風速最大可到 6~7 級',
        impact: [
          { label: '🪦死亡', value: '4 人' },
          { label: '🤕受傷', value: '719 人' },
          { label: '🔦停電', value: '435,634 戶' },
          { label: '💧停水', value: '608,073 戶' },
          { label: '🚨高雄市路樹倒塌', value: ' 2500 棵' },
          { label: '💸農業損失', value: '3.87 億元' },
        ],
        sources: [
          { name: '「高雄市交通局搶修山陀兒颱風受損紅綠燈 08」(由 高雄市政府 提供), 政府網站資料開放宣告 / 姓名標示：高雄市政府, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:%E9%AB%98%E9%9B%84%E5%B8%82%E4%BA%A4%E9%80%9A%E5%B1%80%E6%90%B6%E4%BF%AE%E5%B1%B1%E9%99%80%E5%85%92%E9%A2%B1%E9%A2%A8%E5%8F%97%E6%90%8D%E7%B4%85%E7%B6%A0%E7%87%88_08.jpg'},
          { name: '颱風山陀兒破多項紀錄 發警報到登陸4天4小時最久', url:'https://www.cna.com.tw/news/ahel/202410040102.aspx'},
          { name: '山陀兒颱風登陸 全台11校爆災情 新北、高雄最慘', url:'https://news.ltn.com.tw/news/life/breakingnews/4819313'},
          { name: '山陀兒來了｜未來氣候災害的考驗', url:'https://ourisland.pts.org.tw/content/11063'},
          { name:'國家災害防救科技中心-2024 山陀兒颱風', url:'https://den.ncdr.nat.gov.tw/1330/1334/1335/17836/23674/'}
        ]
      }
    ]
  }, 
  {
    id: 'typhoon-tw-danas',
    region: 'eastAsiaTYPHOON',
    type: 'storm',
    title: '丹娜絲颱風 (Typhoon Danas)',
    location: '台灣中南部',
    date: '2025/Jul',
    pages: [
      { 
        subtitle: '臺南一間三合院的屋頂在經歷丹娜絲颱風吹襲後破損\n#中度颱風 #風災', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Roof_of_a_traditional_Southern-Min_styled_brick_house_in_Tainan_after_destructed_by_Typhoon_Danas_2025-10-05.jpg/1920px-Roof_of_a_traditional_Southern-Min_styled_brick_house_in_Tainan_after_destructed_by_Typhoon_Danas_2025-10-05.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20251231121317',
        content: '丹娜絲為有紀錄以來，首個在嘉義登陸的颱風，挾帶強烈西南風造成風災，大範圍衝擊雲嘉南沿海。\n丹納絲造成的災害有 : 北門七股魚塭潰堤、電桿成排倒斷、通訊系統大規模中斷、老舊建物嚴重破壞，與損毀嘉義與臺南多處太陽能板等。\n\n▌主要農畜牧受損排行榜\n• 農作物 : 香蕉 > 文旦 > 芭樂 > 竹筍\n• 畜牧 : 雞\n• 漁產 : 牡蠣 > 虱目魚 > 文蛤',
        impact: [
          { label: '🪦死亡', value: '2 人' },
          { label: '🤕受傷', value: '726 人' },
          { label: '💸農業損失', value: '32.8 億元' },
        ],
        sources: [
          { name: '"Roof of a traditional Southern-Min styled brick house in Tainan after destructed by Typhoon Danas 2025-10-05" (由 Liu Shu fu / 中華民國總統府), CC-BY 4.0, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Roof_of_a_traditional_Southern-Min_styled_brick_house_in_Tainan_after_destructed_by_Typhoon_Danas_2025-10-05.jpg'},
          { name: '丹娜絲颱風0707》麻豆文旦落果八成，酪梨農損四成，北門七股魚塭潰堤', url:'https://www.newsmarket.com.tw/blog/223787/'},
          { name:'國家災害防救科技中心-2025 丹娜絲颱風', url:'https://den.ncdr.nat.gov.tw/1330/1334/1335/26616/26619/'}
        ]
      }
    ]
  }, 
  {
    id: 'cyclone-biparjoy',
    region: 'southAsiaCYCLONE',
    type: 'storm',
    title: 'Cyclone Biparjoy (比頗傑氣旋)',
    location: 'Pakistan & India',
    date: '2023/Jun',
    pages: [
      { 
        subtitle: '印度古吉拉特邦 (Gujarat) 的Tarnetar Fair傳統文化慶典的街頭\n#提前疏散成功', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tarnetar_Fair_18.jpg/1920px-Tarnetar_Fair_18.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20200229041630',
        content: '比頗傑氣旋主要侵襲印度西部與巴基斯坦東南部，在印度古吉拉特邦沿海登陸，帶來強風、豪雨與風暴潮。印度政府提前發布警報並進行大規模疏散，因此雖然氣旋造成廣泛停電、淹水，和交通中斷，但人員傷亡相對低。',
        impact: [
          { label: '🪦死亡', value: '2 人' },
          { label: '🤕受傷', value: '23 人' },
          { label: '🔦村莊停電', value: '4000 座↑' },
        ],
        sources: [
          { name: '“Tarnetar Fair 18”by Snehrashmi, CC-BY 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Tarnetar_Fair_18.jpg' },
          { name: '狂風暴雨襲擊！ 熱帶氣旋「比頗傑」登陸印度', url:'https://news.ttv.com.tw/news/11206150040100M'},
          { name: '強烈氣旋比頗傑登陸印度 幸未傳嚴重人命損失', url:'https://www.cna.com.tw/news/aopl/202306160340.aspx'},
          { name:'國家災害防救科技中心-2023 比頗傑氣旋影響印度及巴基斯坦(6月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/12676/12891/'}
        ]
      }
    ]
  },
  {
    id: 'cyclone-remal',
    region: 'southAsiaCYCLONE',
    type: 'storm',
    title: 'Cyclone Remal (雷馬爾氣旋)',
    location: '孟加拉、印度',
    date: '2024/May',
    pages: [
      { 
        subtitle: '衛星圖: 2024年5月26日上午，強烈氣旋雷瑪爾逼近恆河三角洲地區\n#強烈氣旋', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Remal_2024-05-26_0350Z.jpg/960px-Remal_2024-05-26_0350Z.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240526043325',
        content: '由於氣候變遷，雷馬爾是有史以來形成最快、且持續時間最長的氣旋之一。\n登陸後，雷馬爾氣旋滯留超過了 36 小時，帶來風暴潮、豪雨，與強風。沿海地區的堤防受損，並出現大規模淹水，有數十條村被淹浸。\n當時很多民眾不願意拋棄牲畜和房屋前往避難，遲遲拖到最後一刻，這也是雷馬爾氣旋造成大量傷亡的原因之一。\n\n在印度西孟加拉邦 (West Bangal)，有4人在這場氣旋中觸電死亡，2人分別被倒塌的建物壓死，沿岸還有不少茅草屋屋頂、電線杆及樹木被吹毀。',
        impact: [
          { label: '🪦死亡', value: '38 人↑' },
          { label: '👤失蹤', value: '16 人' },
          { label: '🏚️房屋毀損', value: '35,000 棟' },
        ],
        sources: [
          { name: `"Remal 2024-05-26 0350Z" by AHI imagery from JMA's Himawari 9 Satellite, Japan Meteorological Agency, CC BY 4.0, Wikimedia Commons`, url: 'https://commons.wikimedia.org/wiki/File:Remal_2024-05-26_0350Z.jpg' },
          { name: 'At least 16 dead as cyclone hits Bangladesh and India', url:'https://www.bbc.com/news/articles/ckvv8q10vxvo'},
          { name: '風暴雷馬爾襲孟加拉印度 至少16死 數十萬戶停電', url:'https://www.hk01.com/%E5%8D%B3%E6%99%82%E5%9C%8B%E9%9A%9B/1023418/%E9%A2%A8%E6%9A%B4%E9%9B%B7%E9%A6%AC%E7%88%BE%E8%A5%B2%E5%AD%9F%E5%8A%A0%E6%8B%89%E5%8D%B0%E5%BA%A6-%E8%87%B3%E5%B0%9116%E6%AD%BB-%E6%95%B8%E5%8D%81%E8%90%AC%E6%88%B6%E5%81%9C%E9%9B%BB'},
          { name:'國家災害防救科技中心-2024 熱帶氣旋雷馬爾影響孟加拉及印度(5月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13343/'}
        ]
      }
    ]
  },
  {
    id: 'hurricane-john',
    region: 'americaHURRI',
    type: 'storm',
    title: 'Hurricane John (約翰颶風)',
    location: 'southern Mexico',
    date: '2024/Sep',
    pages: [
      { 
        subtitle: '颶風海倫和約翰幾乎同時出現在大西洋颶風帶\n#一周內二度登陸 #降雨和嚴重土石流 #沿海城市災情嚴重', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Hurricane_Helene_and_Tropical_Storm_John_2024-09-25.jpg/1920px-Hurricane_Helene_and_Tropical_Storm_John_2024-09-25.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240926150000',
        content: '約翰颶風快速增強至三級颶風後，在墨西哥南部格瑞羅州 (Guerrero) 登陸，又在近海凝聚水氣重新增強後往北二次登陸，所到之處無不出現豪雨和洪水。\n約翰威力不在於風暴，而是降雨，短短幾天內，相當於一年的降雨量就傾瀉而下，襲擊沿海山區，引發山體滑坡和洪災。',
        impact: [
          { label: '🪦死亡', value: '8 人' },
          { label: '🏃‍♂️疏散', value: '約 3000 人' },
          { label: '⚠️併發災害', value: '洪水、土石流' },
        ],
        sources: [
          { name: '“Hurricane Helene and Tropical Storm John 2024-09-25”by NASA, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Hurricane_Helene_and_Tropical_Storm_John_2024-09-25.jpg' },
          { name: 'John as a tropical storm hits Mexico’s Pacific coast a 2nd time', url:'https://apnews.com/article/tropical-storm-john-acapulco-mexico-flooding-420006da3ed0e8f3bdcc57e8a27702b4'},
          { name: '颶風約翰兩度登陸墨西哥至少8死 居民撤離家園', url:'https://www.cna.com.tw/news/aopl/202409290017.aspx'},
          { name:'國家災害防救科技中心-2024 颶風約翰影響墨西哥(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13483/'}
        ]
      }
    ]
  },
  {
    id: 'hurricane-francine',
    region: 'americaHURRI',
    type: 'storm',
    title: 'Hurricane Francine (颶風弗朗辛)',
    location: 'Louisiana, USA',
    date: '2024/Sep',
    pages: [
      { 
        subtitle: '2024年9月11日，颶風弗朗辛正在逼近路易斯安那州', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Francine_2024-09-11_1746Z.jpg/960px-Francine_2024-09-11_1746Z.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240912083149',
        content: '弗朗辛颶風以二級颶風強度登陸美國路易斯安那州，帶來強風、豪雨與約 3 公尺風暴潮。強風將海水推向岸邊所造成的風暴潮，使海平面短時間大幅上升，導致路易斯安那州大面積淹水、部分交通中斷，與港口活動暫停。',
        impact: [
          { label: '🪦死亡', value: '6 人' },
          { label: '🔦停電戶', value: '30 萬↑' },
          { label: '⏸️交通中斷', value: '港口活動暫停' },
        ],
        sources: [
          { name: `"Francine 2024-09-11 1746Z" by ABI imagery from NOAA's GOES-16 Satellite, Public domain, via Wikimedia Commons`, url: 'https://commons.wikimedia.org/wiki/File:Francine_2024-09-11_1746Z.jpg' },
          { name: 'Francine updates: Storm pushes across South as tropical depression', url:'https://abcnews.com/US/live-updates/hurricane-francine-live-updates/?id=113580135'},
          { name: '颶風弗朗辛襲捲路易斯安那州 30多萬戶停電', url:'https://www.cna.com.tw/news/aopl/202409120161.aspx'},
          { name:'國家災害防救科技中心-2024 颶風弗朗辛登陸美國路易斯安那州(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13461/'}
        ]
      }
    ]
  },
  {
    id: 'hurricane-helene',
    region: 'americaHURRI',
    type: 'storm',
    title: 'Hurricane Helene (颶風海倫)',
    location: 'Southeastern United States',
    date: '2024/Sep',
    pages: [
      { 
        subtitle: '颶風海倫襲擊南卡羅來納州後，長老會學院內一棵被連根拔起的樹橫臥在地', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Presbyterian_College_after_Hurricane_Helene%2C_10-1-2024_01.jpg/1920px-Presbyterian_College_after_Hurricane_Helene%2C_10-1-2024_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20241001142944',
        content: '海倫颶風是 2005 年繼卡崔娜颶風 (Hurricane Katrina) 後，於美國本土奪走最多人命的颶風。\n墨西哥灣當時海面溫度超過 28°C (高於 2003 至 2014 年的平均值)，海倫因極高海溫得以迅速增強，升級為四級颶風，後續在美國東南部地區帶來強降雨、強風、洪水災害，以及嚴重的風暴潮，而風暴潮造成嚴重的沿海溢淹災害。',
        impact: [
          { label: '🪦死亡', value: '232 人' },
          { label: '⚠️電信基地台損壞', value: '4387 座' },
          { label: '💸經濟損失', value: '2500 億美元' },
        ],
        sources: [
          { name: '“Presbyterian College after Hurricane Helene, 10-1-2024 01”by PCN02WPS, CC-BY 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Presbyterian_College_after_Hurricane_Helene,_10-1-2024_01.jpg'},
          { name: 'Dramatic pictures from southern US show scale of Hurricane Helene devastation', url:'https://www.bbc.com/news/articles/cwylvy7enrgo'},
          { name:'國家災害防救科技中心-2024 颶風海倫侵襲美國東南部之災害初探(9月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13485/'}
        ]
      }
    ]
  },
  {
    id: 'hurricane-milton',
    region: 'americaHURRI',
    type: 'storm',
    title: 'Hurricane Milton (米爾頓颶風)',
    location: 'Florida, USA',
    date: '2024/Oct',
    pages: [
      { 
        subtitle: '米爾頓也侵襲了墨西哥，圖為颶風米爾頓過後，墨西哥猶加敦州的一棟房屋被摧毀', 
        img:'https://upload.wikimedia.org/wikipedia/commons/f/fe/Vivienda_en_Chuburn%C3%A1_Hurac%C3%A1n_Milton.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20241009225130',
        content: '米爾頓颶風在 2024 年 10 月於墨西哥灣形成，是墨西哥灣有史以來第二強烈的熱帶氣旋，並且是大西洋史上第五強的颶風。\n24 小時內，米爾頓由 1 級增強至 5 級，颶風眼相當清晰，核心紮實，伴隨著極端天氣條件，它夾帶豪雨帶來嚴重淹水，同時又引發多起龍捲風，造成大範圍電力中斷。當時佛羅里達州一共發布了 126 次龍捲風警報。',
        impact: [
          { label: '🪦死亡', value: '35 人↑' },
          { label: '🏃‍♂️疏散', value: '200 萬人↑' },
          { label: '💸經濟損失', value: '500 億美元' },
        ],
        sources: [
          { name: '“Vivienda en Chuburná Huracán Milton”by Gaeln011, CC-BY 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Vivienda_en_Chuburn%C3%A1_Hurac%C3%A1n_Milton.jpg' },
          { name: '米爾頓颶風來襲：美國佛州緊急狀態，坦帕灣百年最強風暴', url:'https://global.udn.com/global_vision/story/8662/8280168'},
          { name:'國家災害防救科技中心-2024 10月美國米爾頓(Milton)颶風事件報導', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/13499/'}
        ]
      }
    ]
  },
  {
    id: 'cyclone-DANA',
    region: 'southAsiaCYCLONE',
    type: 'storm',
    title: 'Cyclone DANA (達那氣旋)',
    location: '印度東岸',
    date: '2024/Oct',
    pages: [
      { 
        subtitle: '奧裡薩邦的集市街景\n#強烈氣旋風暴', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Street_market_scene_at_Onekdeli%2C_Odisha_02.jpg/1920px-Street_market_scene_at_Onekdeli%2C_Odisha_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20240510072704',
        content: '10/25 熱帶氣旋達那以強列氣旋等級登陸印度的奧裡薩邦，強降雨、強風、風暴潮，導致奧裡薩邦與西孟加拉邦發生嚴重重洪水，至少有 110 萬人被疏散至避難所。',
        impact: [
          { label: '🪦死亡', value: '4 人' },
          { label: '🔦停電', value: '200 萬戶↑' },
          { label: '作物淹沒', value: '113,312 公頃' },
        ],
        detailImgTitle: '北印度洋  氣旋 DANA 紅外線衛星圖',
        detailImg: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/2024_JTWC_03B_IR_satellite_imagery.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail_unscaled&_=20241025013156',
        sources: [
          { name: '“Street market scene at Onekdeli, Odisha 02”by Drashokk, CC BY-SA 4.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Street_market_scene_at_Onekdeli,_Odisha_02.jpg'},
          { name: '“2024 JTWC 03B IR satellite imagery”by Joint Typhoon Warning Center, Public domain, via Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:2024_JTWC_03B_IR_satellite_imagery.jpg'},
          { name: 'India evacuating more than a million people as Cyclone Dana nears', url:'https://www.bbc.com/news/articles/c89vw50kj3yo'},
          { name: '強烈氣旋達那來襲 印度東岸疏散至少110萬人', url:'https://www.cna.com.tw/news/aopl/202410240312.aspx'},
          { name:'國家災害防救科技中心-2024 熱帶氣旋 DANA侵襲印度(10月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/23643/'}
        ]
      }
    ]
  },
  {
    id: 'cyclone-fengal',
    region: 'southAsiaCYCLONE',
    type: 'storm',
    title: 'Cyclone Fengal (氣旋豐格爾)',
    location: '印度南部、斯里蘭卡',
    date: '2024/Nov',
    pages: [
      { 
        subtitle: '印度本地治里市是一座海岸城市，圖為本地治里市的石灘景觀', 
        img:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/1920px-Pondicherry-Rock_beach_aerial_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20140611001447',
        content: '11/29 豐格爾氣旋掃過斯里蘭卡沿岸，帶來強列降雨，並引發山崩，共計有 17 人死亡，近 47 萬人在臨時營地避難。\n隔日，豐格爾氣旋又在印度坦米爾那都邦 (Tamil Nadu) 登陸，附近的邦狄哲利 (Puducherry) 因此達到 30 年來最高的 24 小時降雨量。',
        impact: [
          { label: '🪦死亡', value: '20 人' },
          { label: '⚡觸電身亡', value: '3 人' },
          { label: '印度清奈機場', value: '⛔暫時關閉' },
        ],
        sources: [
          { name: '“Pondicherry-Rock beach aerial view”by Karthik Easvur, CC BY-SA 3.0, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Pondicherry-Rock_beach_aerial_view.jpg'},
          { name: 'Cyclone Fengal: Waterlogging in several parts of Chennai amid heavy rainfall', url:'https://www.hindustantimes.com/india-news/cyclone-fengal-waterlogging-in-several-parts-of-chennai-amid-heavy-rainfall-101732956338649.html'},
          { name: '氣旋挾豪雨淹沒印度南部 男子冒險搶救流浪狗', url:'https://news.ebc.net.tw/news/world/457237'},
          { name:'國家災害防救科技中心-2024 熱帶氣旋豐格爾影響印度(11月)', url:'https://den.ncdr.nat.gov.tw/1330/1334/1336/13209/23804/'}
        ]
      }
    ]
  },
];
