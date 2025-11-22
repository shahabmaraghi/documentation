export const sendSingleSmsApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Send Single SMS API",
    version: "1.0.0",
    description:
      "سرویس ارسال پیامک تک به شما این امکان را می‌دهد که بدون نیاز به داشتن خط خدماتی و طی کردن پروسه زمان‌بر تهیه آن بتوانید از طریق وب سرویس به راحتی و بالاترین سرعت ممکن پیام‌های خود را به تمامی کاربران اعم از فیلتر و غیر فیلتر ارسال نمایید.",
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "Production server",
    },
  ],
  paths: {
    "/WebService/SendSingleSms": {
      post: {
        summary: "",
        xScalarIgnore: true,
        description: "",
        operationId: "sendSingleSms",
        tags: ["SMS"],
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["receptors", "message"],
                properties: {
                  sendDate: {
                    type: "string",
                    format: "date-time",
                    description:
                      "تاریخ و زمان دقیق ارسال پیامک که اگر قید نشود در همان لحظه پیامک ارسال می‌شود.",
                    example: "2024-12-25T09:51:45Z",
                  },
                  receptors: {
                    type: "array",
                    description: "لیست گیرندگان پیامک",
                    items: {
                      type: "object",
                      required: ["mobile"],
                      properties: {
                        mobile: {
                          type: "string",
                          description: "شماره گیرنده پیامک",
                          example: "0919*******",
                        },
                        clientReferenceId: {
                          type: "string",
                          description:
                            "برای تعیین شماره‌ای یکتا از طرف کاربر برای هر پیامک به کار می‌رود و پس از ارسال پیامک می‌توان با متد status کلیه اطلاعات پیامک ارسال شده را دریافت کرد.",
                          example: "string",
                        },
                      },
                    },
                  },
                  message: {
                    type: "string",
                    description: "متن پیامک",
                    example: "سلام، این یک پیامک تستی است.",
                  },
                  lineNumber: {
                    type: "string",
                    description: "شماره خط ارسال کننده (اختیاری)",
                    example: "10008566",
                  },
                  checkId: {
                    type: "integer",
                    description: "شناسه چک (اختیاری)",
                    example: 0,
                  },
                },
                example: {
                  sendDate: "2024-12-25T09:51:45Z",
                  receptors: [
                    {
                      mobile: "0919*******",
                      clientReferenceId: "string",
                    },
                    {
                      mobile: "0937*******",
                      clientReferenceId: "string",
                    },
                  ],
                  message: "سلام، این یک پیامک تستی است.",
                  lineNumber: "10008566",
                  checkId: 0,
                },
              },
            },
          },
        },
        "x-codeSamples": [
          {
            lang: "curl",
            label: "curl",
            source: `curl -X 'POST' \
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms' \
  -H 'accept: text/plain' \
  -H 'ApiKey: "your-apiKey' \
  --data '{
    "receptors": [
    {
    "mobile": "0937****",
    "clientReferenceId": "1"
    }
    ],
    "message": "سلام، این یک پیامک تستی است.",
    "lineNumber": "10008566",
    "checkId": 0
    }'`,
          },
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class Receptor
{
    public string Mobile { get; set; }
    public string ClientReferenceId { get; set; }
}

public class SmsRequest
{
    public long Date { get; set; }
    public Receptor[] Receptors { get; set; }
    public string Message { get; set; }
    public string LineNumber { get; set; }
    public int CheckId { get; set; }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
        var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms");

        var smsRequest = new SmsRequest
        {
            Date = 0,
            Receptors = new[]
            {
                new Receptor
                {
                    Mobile = "string",
                    ClientReferenceId = "string"
                }
            },
            Message = "string",
            LineNumber = "string",
            CheckId = 0
        };

        var json = JsonConvert.SerializeObject(smsRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        request.Content = content;

        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        Console.WriteLine(await response.Content.ReadAsStringAsync());
    }
}`,
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
  "date": 0,
  "receptors": [
    {
      "mobile": "string",
      "clientReferenceId": "string"
    }
  ],
  "message": "سلام، این یک پیامک تستی است.",
  "lineNumber": "10008566",
  "checkId": 0
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'ApiKey: "your-apiKey'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;`,
          },
          {
            lang: "java",
            label: "Java",
            source: `import com.google.gson.Gson;
import okhttp3.*;

import java.io.IOException;

class Receptor {
    private String mobile;
    private String clientReferenceId;

    public Receptor(String mobile, String clientReferenceId) {
        this.mobile = mobile;
        this.clientReferenceId = clientReferenceId;
    }
}

class SmsRequest {
    private long date;
    private Receptor[] receptors;
    private String message;
    private String lineNumber;
    private int checkId;

    public SmsRequest(long date, Receptor[] receptors, String message, String lineNumber, int checkId) {
        this.date = date;
        this.receptors = receptors;
        this.message = message;
        this.lineNumber = lineNumber;
        this.checkId = checkId;
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Receptor[] receptors = { new Receptor("string", "string") };

        SmsRequest smsRequest = new SmsRequest(
                0,
                receptors,
                "string",
                "string",
                0
        );

        Gson gson = new Gson();
        String json = gson.toJson(smsRequest);

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("ApiKey", "your-apiKey")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            System.out.println(response.body().string());
        }
    }
}`,
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `var request = require('request');
var options = {
  method: 'POST',
  url: 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms',
  headers: {
    'Content-Type': 'application/json',
    'ApiKey: "your-apiKey'
  },
  body: JSON.stringify({
    "date": 0,
    "receptors": [
      {
        "mobile": "string",
        "clientReferenceId": "string"
      }
    ],
    "message": "سلام، این یک پیامک تستی است.",
    "lineNumber": "10008566",
    "checkId": 0
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`,
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests
import json

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"

payload = json.dumps({
  "date": 0,
  "receptors": [
    {
      "mobile": "string",
      "clientReferenceId": "string"
    }
  ],
  "message": "سلام، این یک پیامک تستی است.",
  "lineNumber": "10008566",
  "checkId": 0
})
headers = {
  'Content-Type': 'application/json',
  'ApiKey: "your-apiKey'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)`,
          },
          {
            lang: "go",
            label: "Go",
            source: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"io/ioutil"
)

type Receptor struct {
	Mobile            string \`json:"mobile"\`
	ClientReferenceId string \`json:"clientReferenceId"\`
}

type SmsRequest struct {
	Date        int        \`json:"date"\`
	Receptors   []Receptor \`json:"receptors"\`
	Message     string     \`json:"message"\`
	LineNumber  string     \`json:"lineNumber"\`
	CheckId     int        \`json:"checkId"\`
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendSingleSms"

	smsRequest := SmsRequest{
		Date: 0,
		Receptors: []Receptor{
			{
				Mobile:            "string",
				ClientReferenceId: "string",
			},
		},
		Message:    "string",
		LineNumber: "string",
		CheckId:    0,
	}

	jsonData, err := json.Marshal(smsRequest)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("ApiKey", "your-apiKey")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}
	fmt.Println(string(body))
}`,
          },
        ],
        responses: {
          "200": {
            description: "درخواست با موفقیت انجام شد",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس",
                      example: true,
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت",
                      example: 200,
                    },
                    message: {
                      type: "string",
                      description: "پیام وضعیت وب سرویس",
                      example: "با موفقیت انجام شد",
                    },
                    data: {
                      type: "object",
                      properties: {
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              messageBody: {
                                type: "string",
                                description: "متن پیامک",
                                example: "سلام، این یک پیامک تستی است.",
                              },
                              receptor: {
                                type: "string",
                                description: "شماره گیرنده",
                                example: "0937*******",
                              },
                              cost: {
                                type: "integer",
                                description: "هزینه ارسال پیامک",
                                example: 840,
                              },
                              messageId: {
                                type: "string",
                                description: "شناسه پیامک",
                                example: "23304988",
                              },
                              clientReferenceId: {
                                type: "string",
                                example: "string",
                              },
                              sendDate: {
                                type: "string",
                                format: "date-time",
                                description: "زمان و تاریخ ارسال پیامک",
                                example: "2024-12-25T10:39:08.5211542+03:30",
                              },
                            },
                          },
                        },
                        totalCost: {
                          type: "integer",
                          description: "هزینه کل",
                          example: 1690,
                        },
                      },
                    },
                  },
                  example: {
                    isSuccess: true,
                    statusCode: 200,
                    message: "با موفقیت انجام شد",
                    data: {
                      items: [
                        {
                          messageBody: "سلام، این یک پیامک تستی است.",
                          receptor: "0937*******",
                          cost: 840,
                          messageId: "23304988",
                          clientReferenceId: "string",
                          sendDate: "2024-12-25T10:39:08.5211542+03:30",
                        },
                        {
                          messageBody: "سلام، این یک پیامک تستی است.",
                          receptor: "0919*******",
                          cost: 850,
                          messageId: "23304989",
                          clientReferenceId: "string",
                          sendDate: "2024-12-25T10:39:08.5211542+03:30",
                        },
                      ],
                      totalCost: 1690,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "ApiKey",
        description: "کلید شناسه (اجباری)",
      },
    },
  },
};
