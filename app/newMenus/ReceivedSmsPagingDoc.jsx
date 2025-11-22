import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import SyntaxHighlighter from 'react-syntax-highlighter';
import monokai from 'react-syntax-highlighter/src/styles/hljs/monokai';
import Iconify from '../../../../components/Iconify';
import { useTheme } from '@emotion/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import CustomContainer from '../../../../components/CustomContainer';
import CustomCard from '../../../../components/CustomCard';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import EndPointCards from '../../../../sections/@dashboard/developers/RestDocs/EndPointCards';
import Scrollbar from '../../../../components/Scrollbar';
import useTabs from '../../../../hooks/useTabs';
import TableHeaderActionButton from '../../../../components/TableHeaderActionButton';
import PageHeader from '../../../../components/PageHeader';
import { useNavigate } from 'react-router';
import DocCustomTable from '../../../../sections/@dashboard/developers/RestDocs/DocCustomTable';
import TabImage from '../components/TabImage';
const ReceivedSmsPagingDoc = ({ endPoint, method }) => {
  const { currentTab, onChangeTab, setCurrentTab } = useTabs('curl');
  const themes = useTheme();
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'left',
  }));
  const programms = [
    {
      id: 'curl',
      details: [
        {
          type: 'code',
          message: `curl -X 'GET' \
  'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1' \
  -H 'accept: */*'\
  -H 'ApiKey: your-apiKey'`,
        },
      ],
    },
    {
      id: 'C#',
      details: [
        {
          type: 'code',
          message: `var client = new HttpClient();
client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
var request = new HttpRequestMessage(HttpMethod.Get, "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());`,
        },
      ],
    },
    {
      id: 'php',
      details: [
        {
          type: 'code',
          message: `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'ApiKey: your-apiKey'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;`,
        },
      ],
    },
    {
      id: 'java',
      details: [
        {
          type: 'code',
          message: `OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "");
Request request = new Request.Builder()
  .url("https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1")
  .method("GET", body)
  .addHeader("ApiKey", "your-apiKey")
  .build();
Response response = client.newCall(request).execute();`,
        },
      ],
    },

    {
      id: 'nodeJs',
      details: [
        {
          type: 'code',
          message: `var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1',
  'headers': {
    'ApiKey: "your-apiKey'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

`,
        },
      ],
    },
    {
      id: 'python',
      details: [
        {
          type: 'code',
          message: `import requests

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1"

payload = {}
headers = {
  'ApiKey: "your-apiKey'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)`,
        },
      ],
    },
    {
      id: 'go',
      details: [
        {
          type: 'code',
          message: `package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=10&PageSize=1"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("ApiKey", "your-apiKey")
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}`,
        },
      ],
    },
  ];
  const TABS = [
    {
      value: 'curl',
      image: '/images/curl.png',
    },
    {
      value: 'C#',
      image: '/images/c.svg',
    },
    {
      value: 'php',
      image: '/images/php.svg',
    },
    {
      value: 'java',
      image: '/images/java.svg',
    },
    {
      value: 'nodeJs',
      image: '/images/nodejs2.png',
    },
    {
      value: 'python',
      image: '/images/python.svg',
    },
    {
      value: 'go',
      image: '/images/go.png',
    },
  ];
  const inputColumns = [
    {
      name: 'parameter',
      label: 'پارامتر'
    },
    {
      name: 'type',
      label: 'نوع'
    },
    {
      name: 'description',
      label: 'توضیح'
    },
    {
      name: 'method',
      label: 'روش ارسال پارامتر'
    }
  ];
  
  const inputRows = [
    {
      parameter: 'ApiKey',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'کلید شناسه',
      method: 'Header'
    },
    {
      parameter: 'lineNumber',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'شماره خط',
      method: 'Query parameter'
    },
    {
      parameter: 'isRead',
      type: <Typography sx={{ fontSize: '14px' }}>boolean</Typography>,
      description: ' اگر (0) وارد شود پیام های خوانده نشده و اگر (1) وارد شود پیام های خوانده شده بر می گردد. در صورت وارد نکردن به صورت پیش فرض (0) می باشد.',
      method: 'Query parameter'
    },
    {
      parameter: 'startDate',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string ,date-time</Typography>,
      description: 'تاریخ و زمان دقیق شروع ارسال پیام',
      method: 'Query parameter'
    },
    {
      parameter: 'endDate',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string ,date-time</Typography>,
      description: 'تاریخ و زمان دقیق پایان ارسال پیام',
      method: 'Query parameter'
    },
    {
      parameter: 'pageIndex',
      type: <Typography sx={{ fontSize: '14px' }}>integer</Typography>,
      description: 'تعداد پیام بازگشتی در هر صفحه ، حداکثر تعداد 200 می باشد.',
      method: 'Query parameter'
    },
    {
      parameter: 'pageSize',
      type: <Typography sx={{ fontSize: '14px' }}>integer</Typography>,
      description: 'صفحه مورد نظر را وارد کنید، صفحه اول 1 می باشد.',
      method: 'Query parameter'
    }
  ];
  
  const outputColumns = [
    {
      name: 'parameter',
      label: 'پارامتر'
    },
    {
      name: 'description',
      label: 'توضیح'
    }
  ];
  
  const outputRows = [
    { parameter: 'isSuccess', description: 'وضعیت پاسخ وب سرویس' },
    { parameter: 'statusCode', description: 'کد وضعیت' },
    { parameter: 'message', description: 'پیام وضعیت وب سرویس' },
    { parameter: 'pageIndex', description: 'شماره صفحه' },
    { parameter: 'pageSize', description: 'تعداد آیتم های موجود در جدول' },
    { parameter: 'totalCount', description: 'تعداد کل آیتم ها' },
    { parameter: 'totalPages', description: 'تعداد کل صفحات' },
    { parameter: 'hasPreviousPage', description: 'وجود صفحه قبلی' },
    { parameter: 'hasNextPage', description: 'وجود صفحه بعدی' },
    { parameter: 'id', description: 'شناسه پیام' },
    { parameter: 'message', description: 'متن پیام' },
    { parameter: 'sender', description: 'فرستنده' },
    { parameter: 'lineNumber', description: 'شماره خط ارسال پیام' },
    { parameter: 'receiveDate', description: 'زمان و تاریخ دریافت پیام' }
  ];
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Page title={'پیام های دریافتی به صورت صفحه بندی'}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'راهنمای وب سرویس REST', href: PATH_DASHBOARD.developers.restDocs },
          { name: 'پیام های دریافتی به صورت صفحه بندی' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <CustomCard>
          <PageHeader title={'پیام های دریافتی به صورت صفحه بندی'} actions={<></>} />
          <Typography sx={{ mb: 6 }}>
             این
            متد 200 پیام بازگردانده می شود.
          </Typography>
          <EndPointCards
            endPoint={'https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging'}
            method={'GET'}
          />
    <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های ورودی</Typography>
    <Scrollbar>
      <DocCustomTable columns={inputColumns} rows={inputRows} />
    </Scrollbar>

    <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های خروجی</Typography>
    <Scrollbar>
      <DocCustomTable columns={outputColumns} rows={outputRows} />
    </Scrollbar>
          <Typography sx={{ mt: 6, fontSize: '16px', fontWeight: 'bold' }}> جدول خطاها</Typography>
          <Typography sx={{ mt: 1, fontSize: '16px' }}>
            چنانچه درخواست‌های ارسالی شما با خطای خاصی مواجه شد؛ برای آگاهی از دلایل آن می‌توانید از{' '}
            <a
              style={{ cursor: 'pointer', color: theme.palette.primary.light }}
              onClick={() => navigate(PATH_DASHBOARD.developers.errorTable)}
            >
              جدول خطاها
            </a>{' '}
            کمک بگیرید.
          </Typography>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه درخواست</Typography>
          <Stack sx={{ paddingY: 1.5 }}>
            <SyntaxHighlighter
              customStyle={{
                textAlign: 'left',
                direction: 'ltr',
                borderRadius: 7,
                padding: '20px',
                fontSize: '13px',
              }}
              language={"bash"}
              style={monokai}
            >
              https://gateway.ghasedak.me/rest/api/v1/WebService/GetReceivedSmsesPaging?LineNumber=21*******&IsRead=true&StartDate=2024-01-01&EndDate=2024-02-02&PageIndex=1&PageSize=10
            </SyntaxHighlighter>
          </Stack>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه پاسخ</Typography>
          <Stack sx={{ paddingY: 1.5 }}>
            <SyntaxHighlighter
              customStyle={{
                textAlign: 'left',
                direction: 'ltr',
                borderRadius: 7,
                padding: '35px',
                fontSize: '13px',
              }}
              language={"bash"}
              style={monokai}
            >
              {`{
  "isSuccess": true,
  "statusCode": 0,
  "message": "string",
  "data": {
    "pageIndex": 1,
    "pageSize": 10,
    "totalCount": 0,
    "totalPages": 0,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "items": [
      {
        "id": 0,
        "message": "string",
        "sender": "0919*******",
        "lineNumber": "21*******",
        "receiveDate": "2024-07-02T14:00:34.975Z"
      }
    ]
  }
}`}
            </SyntaxHighlighter>
          </Stack>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه کد ورودی</Typography>

          <Scrollbar>
          <Box sx={{ display: 'flex', marginBottom: 3, gap: 2 }}>
  {TABS.map((tab) => (
        <TabImage
        key={tab.value}
        src={tab.image}
        alt={`${tab.value} icon`}
        isActive={currentTab === tab.value}
        onClick={() => setCurrentTab(tab.value)}
      />
  ))}
</Box>
          </Scrollbar>
          {programms
  ?.filter((item) => item?.id === currentTab)[0]
  ?.details?.map((item) => {
    return (
      <Stack sx={{ paddingY: 1.5 }}>
        {currentTab === 'curl' ? (
          <pre
            style={{
              textAlign: 'left',
              direction: 'ltr',
              borderRadius: 7,
              padding: '35px',
              fontSize: '13px',
              color:"rgb(221, 221, 221)",
              backgroundColor: 'rgb(39, 40, 34)', 
              whiteSpace: 'pre-wrap', 
              wordWrap: 'break-word',
            }}
          >
            {item?.message}
          </pre>
        ) : (
          <SyntaxHighlighter
            customStyle={{
              textAlign: 'left',
              direction: 'ltr',
              borderRadius: 7,
              padding: '35px',
              fontSize: '13px',
            }}
            language={currentTab}
            style={monokai}
          >
            {item?.message}
          </SyntaxHighlighter>
        )}
      </Stack>
    );
  })}
        </CustomCard>
      </CustomContainer>
    </Page>
  );
};

export default ReceivedSmsPagingDoc;
