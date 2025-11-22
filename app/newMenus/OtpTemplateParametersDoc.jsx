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
const OtpTemplateParametersDoc = ({ endPoint, method }) => {
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
  'https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak' \
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
var request = new HttpRequestMessage(HttpMethod.Get, "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak");
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
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak',
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
  .url("https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak")
  .method("GET", body)
  .addHeader("ApiKey", "your-apiKey")
  .build();
Response response = client.newCall(request).execute()`,
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
  'url': 'https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak',
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

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak"

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

  url := "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak"
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
    { name: 'method', label: 'روش ارسال پارامتر' }
  ];

  const inputRows = [
    {
      parameter: 'ApiKey',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'کلید شناسه',
      method: 'Header'
    },
    {
      parameter: 'TemplateName',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'نام قالب',
      method: 'Query parameter'
    }

  ];
  const outputColumns = [
    { name: 'parameter', label: 'پارامتر' },
    { name: 'description', label: 'توضیح' }
  ];

  const outputRows = [
    {
      parameter: 'isSuccess',
      description: 'وضعیت پاسخ وب سرویس'
    },
    {
      parameter: 'statusCode',
      description: 'کد وضعیت'
    },
    {
      parameter: 'message',
      description: 'پیام وضعیت وب سرویس'
    },
    {
      parameter: 'params',
      description: 'نام پارامترها'
    },
    {
      parameter: 'message',
      description: 'پیام OTP'
    }
 
  ];
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Page title={'دریافت پارامتر های قالب OTP'}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'راهنمای وب سرویس REST', href: PATH_DASHBOARD.developers.restDocs },
          { name: 'دریافت پارامتر های قالب OTP' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <CustomCard>
          <PageHeader title={'دریافت پارامتر های قالب OTP'} actions={<></>} />
          <Typography sx={{ mb: 6 }}>
از این متد می توانید برای دریافت پارامتر های قالب OTP استفاده کنید.
          </Typography>
          <EndPointCards
            endPoint={'https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters'}
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
              language={"bash"}
              style={monokai}
            >
              https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak
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
              language={"bash"}
              style={monokai}
            >
              {`{
  "Data": {
    "Params": ["Code", "Name"],
    "Message": "کد تایید شما %Code% می باشد\nبه سایت %Name% خوش آمدید"
  },
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

export default OtpTemplateParametersDoc;
