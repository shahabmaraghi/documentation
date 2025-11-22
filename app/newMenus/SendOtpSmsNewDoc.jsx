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
const SendOtpSmsNewDoc = ({ endPoint, method }) => {
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
          message: `curl -X 'POST' \n
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS' \n
  -H 'Content-Type: application/json' \n
  -H 'ApiKey: "your-apiKey' \n
  --data '{
    "sendDate": "2024-07-20T09:22:47.731Z",
    "receptors": [
      {
        "mobile": "093*******",
        "clientReferenceId": "1"
      }
    ],
    "templateName": "your-TemplateName",
    "inputs": [
      {
        "param": "your-Parameter",
        "value": "parameter-Value"
      }
    ],
    "udh": false
  }'`,
        },
      ],
    },
    {
      id: 'C#',
      details: [
        {
          type: 'code',
          message: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class Receptor
{
    public string Mobile { get; set; }
    public string ClientReferenceId { get; set; }
}

public class Input
{
    public string Param { get; set; }
    public string Value { get; set; }
}

public class SmsRequest
{
    public string SendDate { get; set; }
    public Receptor[] Receptors { get; set; }
    public string TemplateName { get; set; }
    public Input[] Inputs { get; set; }
    public bool Udh { get; set; }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
        var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS");

        var smsRequest = new SmsRequest
        {
            SendDate = "2024-07-04T07:41:15.992Z",
            Receptors = new[]
            {
                new Receptor
                {
                    Mobile = "string",
                    ClientReferenceId = "string"
                }
            },
            TemplateName = "string",
            Inputs = new[]
            {
                new Input
                {
                    Param = "string",
                    Value = "string"
                }
            },
            Udh = true
        };

        var json = JsonConvert.SerializeObject(smsRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        request.Content = content;

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}
`,
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
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "sendDate": "2024-07-04T07:41:15.992Z",
  "receptors": [
    {
      "mobile": "string",
      "clientReferenceId": "string"
    }
  ],
  "templateName": "string",
  "inputs": [
    {
      "param": "string",
      "value": "string"
    }
  ],
  "udh": true
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'ApiKey: "your-apiKey'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
`,
        },
      ],
    },
    {
      id: 'java',
      details: [
        {
          type: 'code',
          message: `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;

class Receptor {
    private String mobile;
    private String clientReferenceId;

    public Receptor(String mobile, String clientReferenceId) {
        this.mobile = mobile;
        this.clientReferenceId = clientReferenceId;
    }

    // Getters and setters can be added if needed
}

class Input {
    private String param;
    private String value;

    public Input(String param, String value) {
        this.param = param;
        this.value = value;
    }

    // Getters and setters can be added if needed
}

class SmsRequest {
    private String sendDate;
    private Receptor[] receptors;
    private String templateName;
    private Input[] inputs;
    private boolean udh;

    public SmsRequest(String sendDate, Receptor[] receptors, String templateName, Input[] inputs, boolean udh) {
        this.sendDate = sendDate;
        this.receptors = receptors;
        this.templateName = templateName;
        this.inputs = inputs;
        this.udh = udh;
    }

    // Getters and setters can be added if needed
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Receptor[] receptors = { new Receptor("string", "string") };
        Input[] inputs = { new Input("string", "string") };

        SmsRequest smsRequest = new SmsRequest(
                "2024-07-04T07:41:15.992Z",
                receptors,
                "string",
                inputs,
                true
        );

        Gson gson = new Gson();
        String json = gson.toJson(smsRequest);

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("ApiKey", "your-apiKey")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            System.out.println(response.body().string());
        }
    }
}
`,
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
  'method': 'POST',
  'url': 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS',
  'headers': {
    'Content-Type': 'application/json',
    'ApiKey: "your-apiKey'
  },
  body: JSON.stringify({
    "sendDate": "2024-07-04T07:41:15.992Z",
    "receptors": [
      {
        "mobile": "string",
        "clientReferenceId": "string"
      }
    ],
    "templateName": "string",
    "inputs": [
      {
        "param": "string",
        "value": "string"
      }
    ],
    "udh": true
  })

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
import json

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS"

payload = json.dumps({
  "sendDate": "2024-07-04T07:41:15.992Z",
  "receptors": [
    {
      "mobile": "string",
      "clientReferenceId": "string"
    }
  ],
  "templateName": "string",
  "inputs": [
    {
      "param": "string",
      "value": "string"
    }
  ],
  "udh": True
})
headers = {
  'Content-Type': 'application/json',
  'ApiKey: "your-apiKey'
}

response = requests.request("POST", url, headers=headers, data=payload)

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
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
)

// Receptor represents the structure for the receptor information
type Receptor struct {
	Mobile            string 'json:"mobile"'
	ClientReferenceId string 'json:"clientReferenceId"'
}

// Input represents the structure for the input parameters
type Input struct {
	Param string 'json:"param"'
	Value string 'json:"value"'
}

// SmsRequest represents the JSON structure for the SMS request
type SmsRequest struct {
	SendDate    string     'json:"sendDate"'
	Receptors   []Receptor 'json:"receptors"'
	TemplateName string    'json:"templateName"'
	Inputs      []Input    'json:"inputs"'
	Udh         bool       'json:"udh"'
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS"

	// Create an instance of SmsRequest with the necessary data
	smsRequest := SmsRequest{
		SendDate: "2024-07-04T07:41:15.992Z",
		Receptors: []Receptor{
			{
				Mobile:            "string",
				ClientReferenceId: "string",
			},
		},
		TemplateName: "string",
		Inputs: []Input{
			{
				Param: "string",
				Value: "string",
			},
		},
		Udh: true,
	}

	// Convert SmsRequest to JSON
	jsonData, err := json.Marshal(smsRequest)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("ApiKey", "your-apiKey")

	// Send the request
	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer res.Body.Close()

	// Read the response
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}
	fmt.Println(string(body))
}


`,
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
  const inputColumns= [
    { name: 'parameter', label: 'پارامتر' },
    { name: 'type', label: 'نوع' },
    { name: 'description', label: 'توضیح' },
    { name: 'method', label: 'روش ارسال پارامتر' }
  ]
  const inputRows =[
    {
      parameter: 'ApiKey',
      type: <Typography sx={{ fontSize: '14px' ,whiteSpace:"nowrap"}}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'کلید شناسه',
      method: 'Header',
    },
    {
      parameter: 'sendDate',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string ,date-time</Typography>,
      description: 'تاریخ و زمان دقیق ارسال پیام که اگر قید نشود در همان لحظه OTP ارسال می شود.',
      method: 'JSON body',
    },
    {
      parameter: 'mobile',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'شماره گیرنده پیام',
      method: 'JSON body',
    },
    {
      parameter: 'clientReferenceId',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string </Typography>,
      description: 'برای تعیین شماره ای یکتا از طرف کاربر برای هر پیامک به کار می رود و پس از ارسال پیامک می توان با متد status کلیه اطلاعات OTP ارسال شده را دریافت کرد.',
      method: 'JSON body',
    },
    {
      parameter: 'templateName',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'نام قالب',
      method: 'JSON body',
    },
    {
      parameter: 'param',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: "نام پارامتر ورودی",
      method: 'JSON body',
    },
    {
      parameter: 'value',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>string <span style={{ fontSize: '14px', color: 'red', fontSize: '11px' }}>اجباری</span></Typography>,
      description: 'مقدار پارامتر ورودی',
      method: 'JSON body',
    },
   
   
    {
      parameter: 'udh',
      type: <Typography sx={{ fontSize: '14px',whiteSpace:"nowrap" }}>boolean</Typography>,
      description: 'برای تعیین نوع ارسال پیام ها که می تواند 16 یا 8 بیتی باشد و اگر مقدار true پاس داده شود پیام 16 بیتی و اگر مقدار false داده شود پیام 8 بیتی ارسال خواهد شد. این پارامتر فقط برای پیش شماره 9000 اعمال می شود.',
      method: 'JSON body',
    },
    {
      parameter: 'isVoice',
      type: <Typography sx={{ fontSize: '14px' }}>boolean</Typography>,
      description: 'صوتی بودن یا نبودن پیام را مشخص می کند.',
      method: 'JSON body',
    },

  ];
  
  
  const outputRows=[
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
      parameter: 'messageBody',
      description: 'متن پیام OTP',
    },
    {
      parameter: 'lineNumber',
      description: 'شماره خطی که OTP را ارسال می کند',
    },
    {
      parameter: 'receptor',
      description: 'شماره گیرنده',
    },
    {
      parameter: 'cost',
      description: 'هزینه ارسال OTP',
    },
    {
      parameter: 'messageId',
      description: 'شناسه OTP',
    },
    {
      parameter: 'sendDate',
      description: 'زمان و تاریخ ارسال OTP',
    },
    {
      parameter: 'totalCost',
      description: 'هزینه کلی ارسال OTP',
    },
  ];
  const outputColumns=[
    { name: 'parameter', label: 'پارامتر' },
    { name: 'description', label: 'توضیح' }
  ];
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [copySuccess, setCopySuccess] = useState(false);
  return (
    <Page title={'ارسال پیامک OTP جدید'}>
      <HeaderBreadcrumbs
        links={[
          { name: 'داشبورد', href: PATH_DASHBOARD.root },
          { name: 'راهنمای وب سرویس REST', href: PATH_DASHBOARD.developers.restDocs },
          { name: 'ارسال پیامک OTP جدید' },
        ]}
      />
      <CustomContainer maxWidth={themeStretch ? false : 'lg'}>
        <CustomCard>
          <PageHeader title={'ارسال پیامک OTP جدید'} actions={<></>} />
          <Typography sx={{ mb: 6 }}></Typography>
          <EndPointCards endPoint={'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS'} method={'POST'} />
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های ورودی</Typography>
          <DocCustomTable columns={inputColumns} rows={inputRows} />
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>پارامتر های خروجی</Typography>

          <DocCustomTable columns={outputColumns} rows={outputRows} />
          <Typography sx={{ mt: 6, fontSize: '16px', fontWeight: 'bold' }}> جدول خطاها</Typography>
          <Typography sx={{ mt: 1, fontSize: '16px' }}>
            چنانچه درخواست‌های ارسالی شما با خطای خاصی مواجه شد، برای آگاهی از دلایل آن می‌توانید از{' '}
            <a
              style={{ cursor: 'pointer', color: theme.palette.primary.light }}
              onClick={() => navigate(PATH_DASHBOARD.developers.errorTable)}
            >
              جدول خطاها
            </a>{' '}
            کمک بگیرید.
          </Typography>
          <Typography sx={{ mb: 2, mt: 6, fontSize: '16px', fontWeight: 'bold' }}>نمونه درخواست</Typography>

          <Stack sx={{ paddingY: 5 }}>
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
  "sendDate": "2024-12-25T09:51:45Z",
  "receptors": [
    {
      "mobile": "0919********",
      "clientReferenceId": "1"
    },
 {
      "mobile": "0937********",
      "clientReferenceId": "2"
    }
  ],
  "templateName": "Ghasedak",
  "inputs": [
    {
      "param": "Code",
      "value": "1234"
    }
  ],
  "udh": false,
  "isVoice": false
}`}
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
  "isSuccess": true,
  "statusCode": 200,
  "message": "با موفقیت انجام شد",
  "data": {
    "items": [
      {
        "messageBody": "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما 1234 می باشد ",
        "receptor": "0937********",
        "cost": 840,
        "messageId": "23304979",
        "clientReferenceId": "2",
        "sendDate": "2024-12-25T09:59:45.599126+03:30"
      },
      {
        "messageBody": "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما 1234 می باشد ",
        "receptor": "0919********",
        "cost": 850,
        "messageId": "23304980",
        "clientReferenceId": "1",
        "sendDate": "2024-12-25T09:59:45.599126+03:30"
      }
    ],
    "totalCost": 1690
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

export default SendOtpSmsNewDoc;
