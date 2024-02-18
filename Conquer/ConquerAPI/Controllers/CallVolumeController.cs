using AutoMapper;
using ConquerAPI.DTOs;
using ConquerAPI.Models.Domain;
using ConquerAPI.Repositories.Implementations;
using ConquerAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConquerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CallVolumeController : ControllerBase
    {
        private readonly ICallVolumeRepository _itemRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<CallVolumeController> _logger;

        public CallVolumeController(ICallVolumeRepository itemRepository, IMapper mapper, ILogger<CallVolumeController> logger)
        {
            this._itemRepository = itemRepository;
            _mapper = mapper; 
            _logger = logger;
        }

        [HttpPost]
        [Route("UploadCallVolume")]
        public async Task<ResponseDto> UploadCallVolume(IFormFile file, CancellationToken cancellationToken)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var result = await WriteFile(file);

                _response.Result = result;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        private async Task<List<CallVolumeDto>> WriteFile(IFormFile file)
        {
            List<CallVolumeDto> list = new List<CallVolumeDto>();
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                if (extension == ".xlsx")
                {
                    string fileName = "CallVolumeData_" + DateTime.Now.Ticks.ToString() + extension;

                    var filePath = System.IO.Path.Combine("C:\\Users\\Vamsi\\Desktop\\", "Upload\\Files");

                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }

                    var exactPath = System.IO.Path.Combine(filePath, fileName);

                    using (var stream = new FileStream(exactPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //new DocumentReaderUsingDocX().ConvertDocToHtml(exactPath, "C:\\Users\\Vamsi\\Desktop\\Vamsi - Projects\\Test.html");

                    //System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                    //using (var stream = System.IO.File.Open(exactPath, FileMode.Open, FileAccess.Read))
                    //{
                    //    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    //    {
                    //        do
                    //        {
                    //            reader.Read();
                    //            while (reader.Read())
                    //            {
                    //                CallVolumeDto callVolumeDto = new CallVolumeDto();
                    //                callVolumeDto.CustomerName = reader.GetString(0);
                    //                callVolumeDto.PhoneNumber = reader.GetValue(1).ToString();

                    //                list.Add(callVolumeDto);
                    //            }
                    //        } while (reader.NextResult());
                    //    }
                    //}

                }

            }
            catch(Exception ex)
            {
                throw;
            }
            return list;
        }

        [HttpPost("uploadDocument")]
        public async Task<ResponseDto> UploadDocument(IFormFile document)
        {
            ResponseDto _response = new ResponseDto();
            List<Question> _questions = new List<Question>();

            try
            {
                _logger.LogInformation("GetCallVolumeData is called");

                // Read the Word document and process

                //using (MemoryStream memoryStream = new MemoryStream())
                //{
                //    await document.CopyToAsync(memoryStream);
                //    memoryStream.Position = 0; // Reset the position to the beginning of the stream

                //    DocumentReader reader = new DocumentReader();
                //    using (WordprocessingDocument wordDoc = WordprocessingDocument.Open(memoryStream, false))
                //    {
                //        _response.Result = reader.ReadFormulas(wordDoc);
                //    }
                //    //_questions = await reader.ProcessDocument(memoryStream);
                //}

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    await document.CopyToAsync(memoryStream);
                    memoryStream.Position = 0; // Reset the position to the beginning of the stream

                    DocumentReader reader = new DocumentReader();
                    _questions = await reader.ProcessDocument(memoryStream);
                }

                if (_questions != null)
                {
                    _response.Result = _questions;
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        
        [HttpGet]
        public async Task<ResponseDto> GetCallVolumeData()
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                _logger.LogInformation("GetCallVolumeData is called");
                var callVolumes = await _itemRepository.GetAllCallVolume();

                if (callVolumes != null)
                {
                    _response.Result = _mapper.Map<List<CallVolumeDto>>(callVolumes);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpGet("{id}")]
        public async Task<ResponseDto> GetCallVolumeById(string id)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var callVolume = await _itemRepository.GetCallVolumeById(id);

                if (callVolume != null)
                {
                    _response.Result = _mapper.Map<CallVolumeDto>(callVolume);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPost]
        public async Task<ResponseDto> CreateCallVolume(CallVolumeDto requestDto)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var callVolume = _mapper.Map<CallVolume>(requestDto);
                var newCallVolume = await _itemRepository.CreateCallVolume(callVolume);
                if (newCallVolume != null)
                {
                    _response.Result = _mapper.Map<CallVolumeDto>(newCallVolume);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Internal Server Error";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpPut("{id}")]
        public async Task<ResponseDto> UpdateCallVolume(string id, CallVolumeDto requestDto)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                var callVolume = _mapper.Map<CallVolume>(requestDto);
                var updatedCallVolume = await _itemRepository.UpdateCallVolume(callVolume);

                if (updatedCallVolume != null)
                {
                    _response.Result = _mapper.Map<CallVolumeDto>(updatedCallVolume);
                    _response.IsSuccess = true;
                }
                else
                {
                    _response.IsSuccess = false;
                    _response.Message = "Internal Server Error";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }

        [HttpDelete("{id}")]
        public async Task<ResponseDto> DeleteCallVolume(string id)
        {
            ResponseDto _response = new ResponseDto();
            try
            {
                bool result = await _itemRepository.DeleteCallVolume(id);

                if (!result)
                {
                    _response.IsSuccess = false;
                    _response.Message = "Not Found";
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.Message = ex.Message;
            }
            return _response;
        }
    }
}
