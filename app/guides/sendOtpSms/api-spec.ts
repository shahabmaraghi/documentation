export const sendOtpApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Send OTP SMS API",
    version: "1.0.0",
    description: "سرویس اعتبارسنجی به شما این امکان را می‌دهد که بدون نیاز به داشتن خط خدماتی و طی کردن پروسه زمان‌بر تهیه آن بتوانید از طریق وب سرویس به راحتی و بالاترین سرعت ممکن پیام‌های خود مانند: کد فعال‌سازی، شماره چک و فاکتور، کد قرعه‌کشی و... را به تمامی کاربران اعم از فیلتر و غیر فیلتر ارسال نمایید."
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "Production server"
    }
  ],
  paths: {
    "/WebService/SendOtpWithParams": {
      post: {
        summary: "ارسال پیامک اعتبار سنجی (OTP)",
        description: "ارسال پیامک OTP با استفاده از قالب‌های از پیش تعریف شده",
        operationId: "sendOtpWithParams",
        tags: ["OTP"],
        security: [
          {
            ApiKeyAuth: []
          }
        ],
        parameters: [
          {
            name: "ApiKey",
            in: "header",
            required: true,
            description: "کلید احراز هویت دریافت‌شده از داشبورد قاصدک.",
            schema: {
              type: "string"
            }
          },
          {
            name: "Content-Type",
            in: "header",
            required: true,
            description: "برای ارسال بدنه‌ی JSON مقدار باید application/json باشد.",
            schema: {
              type: "string",
              enum: ["application/json"]
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                title: "Body",
                type: "object",
                required: ["receptors", "templateName", "param1"],
                properties: {
                  sendDate: {
                    type: "string",
                    format: "date-time",
                    description: "تاریخ و زمان دقیق ارسال OTP که اگر قید نشود در همان لحظه OTP ارسال می‌شود.",
                    example: "2024-12-25T09:51:45Z"
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
                          description: "شماره گیرنده OTP",
                          example: "0919*******"
                        },
                        clientReferenceId: {
                          type: "string",
                          description: "برای تعیین شماره‌ای یکتا از طرف کاربر برای هر پیامک به کار می‌رود و پس از ارسال پیامک می‌توان با متد status کلیه اطلاعات OTP ارسال شده را دریافت کرد.",
                          example: "string"
                        }
                      }
                    }
                  },
                  templateName: {
                    type: "string",
                    description: "نام قالب",
                    example: "Ghasedak"
                  },
                  param1: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param2: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param3: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param4: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param5: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param6: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param7: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param8: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param9: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  param10: {
                    type: "string",
                    description: "مقادیر که از سمت شما وارد می‌شود.",
                    example: "string"
                  },
                  isVoice: {
                    type: "boolean",
                    description: "صوتی بودن یا نبودن پیام را مشخص می‌کند.",
                    example: false
                  },
                  udh: {
                    type: "boolean",
                    description: "برای تعیین نوع ارسال پیام‌ها که می‌تواند 16 یا 8 بیتی باشد و اگر مقدار true پاس داده شود پیام 16 بیتی و اگر مقدار false داده شود پیام 8 بیتی ارسال خواهد شد همچنین این پارامتر فقط برای پیش شماره 9000 کاربرد دارد.",
                    example: false
                  }
                },
                example: {
                  sendDate: "2024-12-25T09:51:45Z",
                  receptors: [
                    {
                      mobile: "0919*******",
                      clientReferenceId: "string"
                    },
                    {
                      mobile: "0937*******",
                      clientReferenceId: "string"
                    }
                  ],
                  templateName: "Ghasedak",
                  param1: "string",
                  param2: "string",
                  param3: "string",
                  param4: "string",
                  param5: "string",
                  param6: "string",
                  param7: "string",
                  param8: "string",
                  param9: "string",
                  param10: "string",
                  isVoice: false,
                  udh: false
                }
              }
            }
          }
        },
        "x-codeSamples": [
          {
            lang: "curl",
            label: "curl",
            source: `curl -X 'POST' \
  'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams' \
  -H 'accept: text/plain' \
  -H 'ApiKey: "your-apiKey' \
  --data '{
    "receptors": [
    {
    "mobile": "0937****",
    "clientReferenceId": "1"
    }
    ],
    "templateName": "Ghasedak",
    "param1": "12345",
    "param2": "",
    "param3": "",
    "param4": "",
    "param5": "",
    "param6": "",
    "param7": "",
    "param8": "",
    "param9": "",
    "param10": "",
    "isVoice": false,
    "udh": false
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
    public string TemplateName { get; set; }
    public string Param1 { get; set; }
    public string Param2 { get; set; }
    public string Param3 { get; set; }
    public string Param4 { get; set; }
    public string Param5 { get; set; }
    public string Param6 { get; set; }
    public string Param7 { get; set; }
    public string Param8 { get; set; }
    public string Param9 { get; set; }
    public string Param10 { get; set; }
    public bool IsVoice { get; set; }
    public bool Udh { get; set; }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Add("ApiKey", "your-apiKey");
        var request = new HttpRequestMessage(HttpMethod.Post, "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams");

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
            TemplateName = "Ghasedak",
            Param1 = "12345",
            Param2 = "",
            Param3 = "",
            Param4 = "",
            Param5 = "",
            Param6 = "",
            Param7 = "",
            Param8 = "",
            Param9 = "",
            Param10 = "",
            IsVoice = false,
            Udh = false
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
  CURLOPT_URL => 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams',
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
  "templateName": "Ghasedak",
  "param1": "12345",
  "param2": "",
  "param3": "",
  "param4": "",
  "param5": "",
  "param6": "",
  "param7": "",
  "param8": "",
  "param9": "",
  "param10": "",
  "isVoice": false,
  "udh": false
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
    private String templateName;
    private String param1;
    private String param2;
    private String param3;
    private String param4;
    private String param5;
    private String param6;
    private String param7;
    private String param8;
    private String param9;
    private String param10;
    private boolean isVoice;
    private boolean udh;

    public SmsRequest(long date, Receptor[] receptors, String templateName, String param1, String param2, String param3, String param4, String param5, String param6, String param7, String param8, String param9, String param10, boolean isVoice, boolean udh) {
        this.date = date;
        this.receptors = receptors;
        this.templateName = templateName;
        this.param1 = param1;
        this.param2 = param2;
        this.param3 = param3;
        this.param4 = param4;
        this.param5 = param5;
        this.param6 = param6;
        this.param7 = param7;
        this.param8 = param8;
        this.param9 = param9;
        this.param10 = param10;
        this.isVoice = isVoice;
        this.udh = udh;
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Receptor[] receptors = { new Receptor("string", "string") };

        SmsRequest smsRequest = new SmsRequest(
                0,
                receptors,
                "Ghasedak",
                "12345",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                false,
                false
        );

        Gson gson = new Gson();
        String json = gson.toJson(smsRequest);

        RequestBody body = RequestBody.create(json, MediaType.parse("application/json"));

        Request request = new Request.Builder()
                .url("https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams")
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
  url: 'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams',
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
    "templateName": "Ghasedak",
    "param1": "12345",
    "param2": "",
    "param3": "",
    "param4": "",
    "param5": "",
    "param6": "",
    "param7": "",
    "param8": "",
    "param9": "",
    "param10": "",
    "isVoice": false,
    "udh": false
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

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams"

payload = json.dumps({
  "date": 0,
  "receptors": [
    {
      "mobile": "string",
      "clientReferenceId": "string"
    }
  ],
  "templateName": "Ghasedak",
  "param1": "12345",
  "param2": "",
  "param3": "",
  "param4": "",
  "param5": "",
  "param6": "",
  "param7": "",
  "param8": "",
  "param9": "",
  "param10": "",
  "isVoice": False,
  "udh": False
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
	TemplateName string    \`json:"templateName"\`
	Param1      string     \`json:"param1"\`
	Param2      string     \`json:"param2"\`
	Param3      string     \`json:"param3"\`
	Param4      string     \`json:"param4"\`
	Param5      string     \`json:"param5"\`
	Param6      string     \`json:"param6"\`
	Param7      string     \`json:"param7"\`
	Param8      string     \`json:"param8"\`
	Param9      string     \`json:"param9"\`
	Param10     string     \`json:"param10"\`
	IsVoice     bool       \`json:"isVoice"\`
	Udh         bool       \`json:"udh"\`
}

func main() {
	url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpWithParams"

	smsRequest := SmsRequest{
		Date: 0,
		Receptors: []Receptor{
			{
				Mobile:            "string",
				ClientReferenceId: "string",
			},
		},
		TemplateName: "Ghasedak",
		Param1:       "12345",
		Param2:       "",
		Param3:       "",
		Param4:       "",
		Param5:       "",
		Param6:       "",
		Param7:       "",
		Param8:       "",
		Param9:       "",
		Param10:      "",
		IsVoice:      false,
		Udh:          false,
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
                      example: true
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت",
                      example: 200
                    },
                    message: {
                      type: "string",
                      description: "پیام وضعیت وب سرویس",
                      example: "با موفقیت انجام شد"
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
                                description: "متن پیام OTP",
                                example: "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما %Code% می باشد "
                              },
                              receptor: {
                                type: "string",
                                description: "شماره گیرنده",
                                example: "0937*******"
                              },
                              cost: {
                                type: "integer",
                                description: "هزینه ارسال OTP",
                                example: 840
                              },
                              messageId: {
                                type: "string",
                                description: "شناسه OTP",
                                example: "23304988"
                              },
                              clientReferenceId: {
                                type: "string",
                                example: "string"
                              },
                              sendDate: {
                                type: "string",
                                format: "date-time",
                                description: "زمان و تاریخ ارسال OTP",
                                example: "2024-12-25T10:39:08.5211542+03:30"
                              }
                            }
                          }
                        },
                        totalCost: {
                          type: "integer",
                          description: "هزینه کل",
                          example: 1690
                        }
                      }
                    }
                  },
                  example: {
                    isSuccess: true,
                    statusCode: 200,
                    message: "با موفقیت انجام شد",
                    data: {
                      items: [
                        {
                          messageBody: "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما %Code% می باشد ",
                          receptor: "0937*******",
                          cost: 840,
                          messageId: "23304988",
                          clientReferenceId: "string",
                          sendDate: "2024-12-25T10:39:08.5211542+03:30"
                        },
                        {
                          messageBody: "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما %Code% می باشد ",
                          receptor: "0919*******",
                          cost: 850,
                          messageId: "23304989",
                          clientReferenceId: "string",
                          sendDate: "2024-12-25T10:39:08.5211542+03:30"
                        }
                      ],
                      totalCost: 1690
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "ApiKey",
        description: "کلید شناسه (اجباری)"
      }
    }
  }
};

