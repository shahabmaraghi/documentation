import {
  Box,
  Button,
  IconButton,
  Link,
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
const StatusSms = ({ endPoint, method }) => {
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
  'https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1' \
  -H 'accept: */*\
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
var request = new HttpRequestMessage(HttpMethod.Get, "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1");
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
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1',
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
  .url("https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1")
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
  'url': 'https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1',
  'headers': {
    'ApiKey: "your-apiKey'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`,
        },
      ],
    },
    {
      id: 'python',
      details: [
        {
          type: 'code',
          message: `import requests

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1"

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

  url := "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("ApiKey", "your-apiKey")
  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
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
    { name: 'parameter', label: 'پارامتر' },
    { name: 'type', label: 'نوع' },
    { name: 'description', label: 'توضیح' },
    { name: 'method', label: 'روش ارسال پارامتر' },
  ];
  const inputRows = [
    {
      parameter: 'ApiKey',
      type: (
        <Typography sx={{ fontSize: '14px' ,whiteSpace:"nowrap"}}>
          string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'کلید شناسه',
      method: 'Header',
    },
    {
      parameter: 'Ids',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          array[string] <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'شناسه پیامک که با ( , ) ازهم جدا می شوند. (که می تواند clientReferenceId یا messageId باشد.)',
      method: 'Query parameter',
    },
    {
      parameter: 'Type',
      type: (
        <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>
          integer <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span>
        </Typography>
      ),
      description: 'نوع id پیام را مشخص می کند. ( 1 برای messageid و 2 برای clientReferenceId )',
      method: 'Query parameter',
    },
  ];
  const outputColumns = [
    { name: 'parameter', label: 'پارامتر' },
    { name: 'description', label: 'توضیح' },
  ];
  const outputRows = [
    {
      parameter: 'isSuccess',
      description: 'وضعیت پاسخ وب سرویس',
    },
    {
      parameter: 'statusCode',
      description: 'کد وضعیت',
    },
    {
      parameter: 'message',
      description: 'پیام وضعیت وب سرویس',
    },
    {
      parameter: 'MessageId',
      description: 'شناسه پیام',
    },
    {
      parameter: 'clientReferenceId',
      description:
       "شناسه محلی کاربر برای هر پیامک"
    },
    {
      parameter: 'message',
      description: 'متن پیام',
    },
    {
      parameter: 'lineNumber',
      description: 'شماره خط ارسال پیام',
    },
    {
      parameter: 'sender',
      description: 'فرستنده',
    },
    {
      parameter: 'Receptor',
      description: 'گیرنده',
    },
    {
      parameter: 'Status',
      description: (
        <>
          وضعیت پیام{' '}
          <span>
            <Link
              sx={{ fontSize: '13px', cursor: 'pointer' }}
              onClick={() => {
                const targetElement = document.getElementById('statusTable');
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              (جدول توضیحات وضعیت پیام)
            </Link>
          </span>
        </>
      ),
    },
    {
      parameter: 'Price',
      description: 'هزینه پیام',
    },
    {
      parameter: 'SendDate',
      description: 'تاریخ ارسال پیام',
    },
  ];
  const sendStatusColumns = [
    {
      name: 'code',
      label: 'کد وضعیت',
    },
    {
      name: 'description',
      label: 'توضیحات',
    },
  ];

  const sendStatusArray = [
    { code: 0, description: 'بدون وضعیت' },
    { code: 1, description: 'لغو شده' },
    { code: 2, description: 'بلک لیست' },
    { code: 3, description: 'تحویل به اپراتور' },
    { code: 4, description: 'به گوشی نرسیده' },
    { code: 5, description: 'رسیده به گوشی' },
    { code: 6, description: 'ارسال با خطا' },
    { code: 7, description: 'حالت خطایابی' },
    { code: 8, description: 'نامشخص' },
  ];
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Page title={'وضعیت پیام های ارسالی'}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'راهنمای وب سرویس REST', href: PATH_DASHBOARD.developers.restDocs },
          { name: 'وضعیت پیام های ارسالی' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <CustomCard>
          <PageHeader title={'وضعیت پیام های ارسالی'} actions={<></>} />
          <Typography sx={{ mb: 6 }}>
          برای بررسی وضعیت پیامک‌های ارسالی به گیرندگان، می‌توانید از این متد استفاده کنید. با هر بار فراخوانی این متد، امکان دریافت وضعیت ۱۰۰ پیامک وجود دارد. همچنین می‌توانید گزارش وضعیت پیام‌ها را بر اساس شناسه پیامک قاصدک یا شناسه محلی خود دریافت کنید.
          </Typography>
            
          <EndPointCards
            endPoint={'https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus'}
            method={'GET'}
          />

          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های ورودی</Typography>
          <DocCustomTable columns={inputColumns} rows={inputRows} />
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های خروجی</Typography>

          <DocCustomTable columns={outputColumns} rows={outputRows} />

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
              language="bash"
              style={monokai}
            >
              https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=string&Type=1
            </SyntaxHighlighter>
          </Stack>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه پاسخ</Typography>
          <Stack sx={{ paddingY: 1.5 }}>
            <SyntaxHighlighter
              customStyle={{
                textAlign: 'left',
                direction: 'ltr',
                borderRadius: 7,
                padding: '20px',
                fontSize: '13px',
              }}
              language={currentTab}
              style={monokai}
            >
              {`{
  "Data": [
    {
      "MessageId": "2387931",
      "ClientReferenceId": "11111",
      "Message": "کد ورود شما 1234\nشرکت Ghasedak\nلغو11",
      "LineNumber": "21*******",
      "Receptor": "09396387926",
      "Status": 6,
      "Price": 940,
      "SendDate": "2024-07-09T14:01:02.193563"
    },
   {
      "MessageId": "4248",
      "ClientReferenceId": "22222",
      "Message": "test dotnet package bulk",
      "LineNumber": "21*******",
      "Receptor": "09396387926",
      "Status": 0,
      "Price": 1805,
      "SendDate": "2024-07-09T14:01:36.6632614"
    },
  
  ],
  "IsSuccess": true,
  "StatusCode": 200,
  "Message": "با موفقیت انجام شد"
}
`}
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
                        color: 'rgb(221, 221, 221)',
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

          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>توضیحات کد وضعیت</Typography>

          <Scrollbar id="statusTable">
            <DocCustomTable columns={sendStatusColumns} rows={sendStatusArray} />
          </Scrollbar>
        </CustomCard>
      </CustomContainer>
    </Page>
  );
};

export default StatusSms;
